import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { setInitialState } from "src/slices/customer";
import { useDispatch } from "src/store";
import Form from "../../components/Form";

const EditCustomer: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { customerId } = router.query;
  const { data, isSuccess: fetchedCustomer } = useGetCustomerByIdQuery(
    parseInt(customerId as string)
  ); // basic details
  useEffect(() => {
    fetchedCustomer && dispatch(setInitialState(data));
  }, [fetchedCustomer]);

  return <Form edit={true} />;
};

EditCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditCustomer;
