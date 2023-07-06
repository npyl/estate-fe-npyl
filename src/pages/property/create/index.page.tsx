import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAddPropertyMutation } from "src/services/properties";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectAll as selectAllNewLabels } from "src/slices/labels";
import { selectAll } from "src/slices/property";
import { selectAll as selectAllPropertyFiles } from "src/slices/property/files";
import { selectAll as selectAllNewNotes } from "src/slices/notes";

import { useCreateLabelForPropertyWithIDMutation } from "src/services/labels";
import { useAddNoteToPropertyWithIdMutation } from "src/services/note";

import Form from "../components/Form";

import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";

async function convertBlobUrlsToFiles(blobUrls: string[]): Promise<File[]> {
  function getFileNameFromUrl(blobUrl: string): string {
    // Replace this with your own logic to extract the file name from the blob URL
    // For example, you can use string manipulation or URL parsing methods
    return blobUrl.split('/').pop() || 'unknown_filename';
  }

  const filePromises = blobUrls.map(async (blobUrl) => {
    const response = await fetch(blobUrl);
    const blobData = await response.blob();
    const fileName = getFileNameFromUrl(blobUrl); // Replace with your own logic to extract the file name

    return new File([blobData], fileName);
  });

  return Promise.all(filePromises);
}

const CreatePropertyPage: NextPage = () => {
  const router = useRouter();

  const [create, { isSuccess, isLoading: isCreateLoading, data: createdProperty }] =
    useAddPropertyMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForPropertyWithIDMutation();
  const [createNote, { isSuccess: isNoteSuccess }] =
    useAddNoteToPropertyWithIdMutation();

  // get property images & blueprints as base64-encoded string urls
  const { propertyImages: propertyImagesURLs, propertyBlueprints: propertyBlueprintsURLs } = useSelector(
    selectAllPropertyFiles
  );

  const newLabels = useSelector(selectAllNewLabels);
  const newNotes = useSelector(selectAllNewNotes);
  const body = useSelector(selectAll);

  const createAndAssignNewLabels = () => {
    const createdPropertyId = createdProperty!.id;

    // foreach label; call create-for-customer-with-id
    newLabels.forEach((newLabel) => {
      createLabel({
        propertyId: createdPropertyId,
        labelBody: newLabel,
      });
    });
  };
  const createAndAssignNewNotes = () => {
    const createdPropertyId = createdProperty!.id;

    // foreach note; call create-for-customer-with-id
    newNotes.forEach(async (newNote) => {
      await createNote({
        id: createdPropertyId,
        dataToSend: { content: newNote.content },
      });
    });
  };

  const handleUpload = () => {
    if (!propertyImagesURLs || !propertyBlueprintsURLs) return;

    convertBlobUrlsToFiles(propertyImagesURLs).then((propertyImages) => {
      convertBlobUrlsToFiles(propertyBlueprintsURLs).then((propertyBlueprints) => {

        if (!propertyImages || propertyImages.length === 0) return;
        if (!propertyImages[0]) return;

        const blob = new Blob([JSON.stringify(body)], {
          type: "application/json",
        });

        let dataToSend = new FormData();
        // main image
        dataToSend.append("propertyImage ", propertyImages[0]);
        // gallery
        for (let i = 1; i < propertyImages.length; i++) {
          if (!propertyImages[i]) continue;
          dataToSend.append("propertyGallery ", propertyImages[i]);
        }
        // blueprints
        for (let i = 0; i < propertyBlueprints.length; i++) {
          if (!propertyBlueprints[i]) continue;
          dataToSend.append("propertyBlueprints ", propertyBlueprints[i]);
        }

        dataToSend.append("propertyForm ", blob);

        // perform POST
        create(dataToSend);

        if (isSuccess) {
          createAndAssignNewLabels(); // create&assign labels
          createAndAssignNewNotes(); // create&assign notes
          router.push("/");
        }


      });
    });
  };

  return <>
    <Form performUpload={handleUpload} />

    {
      // loading indicator (incase POST request is taking alot of time)
      isCreateLoading && <LogoProgressIndicator />
    }
  </>
};

CreatePropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreatePropertyPage;
