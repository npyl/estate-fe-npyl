import type { NextPage } from "next";
import React from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import CreateProperty from "src/components/properties/CreateProperty";

const EditPropertyPage: NextPage = () => {
  return (
    <div>
      <CreateProperty edit={true} />
    </div>
  );
};

EditPropertyPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditPropertyPage;
