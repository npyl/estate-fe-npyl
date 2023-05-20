import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import CreateCustomer from "../../create/CreateCustomer";

const EditCustomer: NextPage = () => {
  return <CreateCustomer edit={true} />;
};

EditCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditCustomer;
