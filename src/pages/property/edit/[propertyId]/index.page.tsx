import type { NextPage } from "next";
import React, { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/Form";
import {
  useAddPropertyMutation,
  useGetPropertyByIdQuery,
} from "src/services/properties";
import { selectAll, setInitialState } from "src/slices/property";
import { selectAll as selectAllPropertyFiles } from "src/slices/property/files";

const EditPropertyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { propertyId } = router.query;
  const { data, isSuccess: fetchedProperty } = useGetPropertyByIdQuery(
    parseInt(propertyId as string)
  );

  const { propertyImages, propertyBlueprints } = useSelector(
    selectAllPropertyFiles
  );

  const [edit, { isSuccess, data: editedCustomer }] = useAddPropertyMutation();
  const body = useSelector(selectAll);

  useEffect(() => {
    fetchedProperty && dispatch(setInitialState(data));
  }, [fetchedProperty]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/"); // Navigate to the home page or any other desired page
    }
  }, [isSuccess]);

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
