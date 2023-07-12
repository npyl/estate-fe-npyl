import type { NextPage } from "next";
import { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "./components/Form";
import { useEditPropertyMutation } from "src/services/properties";
import { setInitialState, selectAll } from "src/slices/property";
import {
  setInitialState as setInitialFilesState,
  selectAll as selectAllPropertyFiles,
} from "src/slices/property/files";
import { selectAll as selectAllNewLabels } from "src/slices/labels";
import { selectAll as selectAllNewNotes, setInitialState as setInitialNotesState } from 'src/slices/notes';

import { useCreateLabelForPropertyWithIDMutation } from "src/services/labels";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";
import { useAddNoteToPropertyWithIdMutation } from "src/services/note";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";

import { convertBlobUrlsToBlobs } from "src/utils/blob-urls-to-blobs";

const EditPropertyPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { propertyId } = router.query;

  const { propertyImages: propertyImagesURLs, propertyBlueprints: propertyBlueprintsURLs } = useSelector(
    selectAllPropertyFiles
  );

  const { data: fetchedProperty, isSuccess: isPropertySuccess } =
    useGetPropertyByIdQuery(parseInt(propertyId as string));

  const [createLabel, { isSuccess: isLabelSuccess }] = useCreateLabelForPropertyWithIDMutation();
  const [createNote, { isSuccess: isNoteSuccess }] = useAddNoteToPropertyWithIdMutation();
  const [edit, { isSuccess: isEditProperty, isLoading: isEditLoading, data: editedProperty }] = useEditPropertyMutation();

  const body = useSelector(selectAll);

  const newLabels = useSelector(selectAllNewLabels);
  const newNotes = useSelector(selectAllNewNotes);

  const createAndAssignNewLabels = () => {
    const editedPropertyId = editedProperty!.id;

    // foreach label; call create-for-property-with-id
    newLabels.forEach((newLabel) => {
      createLabel({
        propertyId: editedPropertyId,
        labelBody: newLabel,
      });
    });
  };

  const createAndAssignNewNotes = () => {
    const editedPropertyId = editedProperty!.id;

    // foreach label; call create-for-property-with-id
    newNotes.forEach((newNote) => {
      createNote({
        id: editedPropertyId,
        dataToSend: newNote
      });
    });
  };

  useEffect(() => {
    if (isPropertySuccess) {
      const initialFileState = {
        mainPropertyImage: fetchedProperty.propertyImage,
        secondaryPropertyImages: [...fetchedProperty.images],
        propertyBlueprints: fetchedProperty.blueprints,
      };

      dispatch(setInitialFilesState(initialFileState));
      dispatch(setInitialNotesState(fetchedProperty.notes));
      dispatch(setInitialState(fetchedProperty));
    }
  }, [isPropertySuccess]);

  useEffect(() => {
    if (isEditProperty) {
      createAndAssignNewLabels();
      createAndAssignNewNotes();
      router.push("/");
    }
  }, [isEditProperty]);

  const performUpload = () => {
    convertBlobUrlsToBlobs(propertyImagesURLs).then((propertyImages) => {
      convertBlobUrlsToBlobs(propertyBlueprintsURLs).then((propertyBlueprints) => {
        // perform POST
        edit({id: +propertyId!, body: body});
      })
    });
  };

  return <>
    <Form edit={true} performUpload={performUpload} />

    {
      // loading indicator (incase POST request is taking alot of time)
      isEditLoading && <LogoProgressIndicator />
    }
  </>
};

EditPropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditPropertyPage;
