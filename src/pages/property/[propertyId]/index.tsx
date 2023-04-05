import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

const SingleProperty: NextPage = ({ props }: any) => {
  const router = useRouter();
  const { propertyId } = router.query;

  return <div>{propertyId}</div>;
};

SingleProperty.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default SingleProperty;
