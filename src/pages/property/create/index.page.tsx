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

const CreatePropertyPage: NextPage = () => {
  const router = useRouter();

  const [create, { isSuccess, data: createdProperty }] =
    useAddPropertyMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForPropertyWithIDMutation();
  const [createNote, { isSuccess: isNoteSuccess }] =
    useAddNoteToPropertyWithIdMutation();

  const { propertyImages, propertyBlueprints } = useSelector(
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

  const handleUpload = async () => {
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
    await create(dataToSend);

    if (isSuccess) {
      createAndAssignNewLabels(); // create&assign labels
      createAndAssignNewNotes(); // create&assign notes
      router.push("/");
    }
  };

  return <Form performUpload={handleUpload} />;
};

CreatePropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreatePropertyPage;
