import type { NextPage } from "next";
import React from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Form from "../../components/Form";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { setInitialState } from "src/slices/property";

const EditPropertyPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { propertyId } = router.query;
  const { data, isSuccess: fetchedProperty } = useGetPropertyByIdQuery(
    parseInt(propertyId as string)
  );
  useEffect(() => {
    fetchedProperty && dispatch(setInitialState(data));
  }, [fetchedProperty]);

  const handleUpload = () => {};

  return (
    <div>
      <Form edit={false} onUpload={handleUpload} />
    </div>
  );
};

EditPropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditPropertyPage;
