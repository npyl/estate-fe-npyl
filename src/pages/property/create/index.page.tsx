import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import SimpleAccordion from "src/components/properties/CreateProperty";

const CreateProperty: NextPage = () => {
  return (
    <div>
      <SimpleAccordion />
    </div>
  );
};

CreateProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreateProperty;
