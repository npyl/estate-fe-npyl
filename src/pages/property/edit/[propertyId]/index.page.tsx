import type { NextPage } from "next";
import React, { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Form from "../../components/Form";
import {
  useAddPropertyMutation,
} from "src/services/properties";
import { setInitialState, selectAll } from "src/slices/property";
import {
  setInitialState as setInitialFilesState,
  selectAll as selectAllPropertyFiles,
} from "src/slices/property/files";
import { selectAll as selectAllNewLabels } from "src/slices/labels";

import { useCreateLabelForPropertyMutation } from "src/services/labels";

import { useGetPropertyByIdQuery } from "src/services/properties";

import { useDispatch } from "react-redux";

const EditPropertyPage: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { propertyId } = router.query;

  const { propertyImages, propertyBlueprints } = useSelector(
    selectAllPropertyFiles
  );

  const { data: fetchedProperty, isSuccess: isPropertySuccess } =
    useGetPropertyByIdQuery(parseInt(propertyId as string));

  const [createLabel, { isSuccess: isLabelSuccess }] = useCreateLabelForPropertyMutation();

  const [edit, { isSuccess: isEditProperty, data: editedProperty }] = useAddPropertyMutation();
  const body = useSelector(selectAll);

  const newLabels = useSelector(selectAllNewLabels);

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

  useEffect(() => {
    if (isPropertySuccess) {
      const initialFileState = {
        propertyImages: [
          fetchedProperty.propertyImage,
          ...fetchedProperty.images,
        ],
        propertyBlueprints: fetchedProperty.blueprints,
      };

      dispatch(setInitialFilesState(initialFileState));
      dispatch(setInitialState(fetchedProperty));
    }
  }, [isPropertySuccess]);

  useEffect(() => {
    if (isEditProperty) {
      createAndAssignNewLabels();
      // TODO: update notes
      router.push("/");
    }
  }, [isEditProperty]);

  const performUpload = async () => {
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
    await edit(dataToSend);
  };

  return <Form edit={true} performUpload={performUpload} />;
};

EditPropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditPropertyPage;
