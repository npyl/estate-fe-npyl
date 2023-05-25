import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAddPropertyMutation } from "src/services/properties";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectAll, resetState as resetPropertyState } from "src/slices/property";
import { selectAll as selectAllPropertyFiles, resetState as resetPropertyFilesState } from "src/slices/property/files";
import { selectAll as selectAllNewLabels, resetState as resetLabelsState } from "src/slices/labels";

import Form from "../components/Form";

import { useCreateLabelForPropertyMutation } from "src/services/labels";
import { useDispatch } from "react-redux";

const CreatePropertyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const body = useSelector(selectAll);
  const [create, { isSuccess, data: createdProperty }] = useAddPropertyMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForPropertyMutation();

  const { propertyImages, propertyBlueprints } = useSelector(
    selectAllPropertyFiles
  );

  const newLabels = useSelector(selectAllNewLabels);

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
  const resetState = () => {
    dispatch(resetPropertyState());
    dispatch(resetPropertyFilesState());
    dispatch(resetLabelsState());
  }

  useEffect(() => {
    if (isSuccess) {
      createAndAssignNewLabels();
      // TODO: create notes
      resetState();
      router.push("/");
    }
  }, [isSuccess, router]);

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
  };

  return <Form create={true} performUpload={handleUpload} />;
};

CreatePropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreatePropertyPage;
