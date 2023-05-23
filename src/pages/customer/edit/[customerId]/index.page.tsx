import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
} from "src/services/customers";
import { setInitialState, selectAll } from "src/slices/customer";
import { useDispatch } from "src/store";
import Form from "../../components/Form";

const EditCustomer: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { customerId } = router.query;
  const { data, isSuccess: fetchedCustomer } = useGetCustomerByIdQuery(
    parseInt(customerId as string)
  ); // basic details
  const [edit, { isSuccess, data: editedCustomer }] = useAddCustomerMutation();
  const body = useSelector(selectAll);

  useEffect(() => {
    fetchedCustomer && dispatch(setInitialState(data));
  }, [fetchedCustomer]);

  const performUpload = () => {
    edit(body);
  };

  return <Form edit={true} performUpload={performUpload} />;
};

EditCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditCustomer;
