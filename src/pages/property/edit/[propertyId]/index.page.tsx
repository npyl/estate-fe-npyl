import type { NextPage } from "next";
import React from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import Form from "../../components/Form";

const EditPropertyPage: NextPage = () => {
  return (
    <div>
      <Form edit={true} />
    </div>
  );
};

EditPropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditPropertyPage;
