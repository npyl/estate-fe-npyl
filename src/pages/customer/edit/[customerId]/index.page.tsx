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
import { useCreateLabelForCustomerMutation } from "src/services/labels";

import { setInitialState, selectAll } from "src/slices/customer";
import { selectAll as selectAllNewLabels } from "src/slices/labels";
import { useDispatch } from "src/store";
import Form from "../../components/Form";

const EditCustomer: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { customerId } = router.query;
  const { data, isSuccess: fetchedCustomer } = useGetCustomerByIdQuery(
    parseInt(customerId as string)
  );
  const [edit, { isSuccess: isEditedSuccess, data: editedCustomer }] = useAddCustomerMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForCustomerMutation();
  const body = useSelector(selectAll);

  const newLabels = useSelector(selectAllNewLabels);

  const performUpload = () => {
    edit(body);
  };
  const createAndAssignNewLabels = () => {
    const editedCustomerId = editedCustomer!.id;

    // foreach label; call create-for-customer-with-id
    newLabels.forEach(async (newLabel) => {
      await createLabel({
        customerId: editedCustomerId,
        labelBody: newLabel,
      });
    });
  };

  useEffect(() => {
    fetchedCustomer && dispatch(setInitialState(data));
  }, [fetchedCustomer]);

  useEffect(() => {
    if (isEditedSuccess && editedCustomer) {
      createAndAssignNewLabels(); // create&assign labels
      // TODO: notes
      router.push('/customer');
    }
  }, [isEditedSuccess, editedCustomer])

  return <Form edit={true} performUpload={performUpload} />;
};

EditCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditCustomer;
