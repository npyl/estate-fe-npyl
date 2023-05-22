import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectAll } from "src/slices/customer";
import { selectAll as selectAllNewLabels } from "src/slices/labels";

import { useAddCustomerMutation } from "src/services/customers";
import { useCreateLabelForCustomerMutation } from "src/services/labels";

import { NextPage } from "next";
import Form from "../components/Form";

const CreateCustomer: NextPage = () => {
  const router = useRouter();

  const [create, { isSuccess, data: createdCustomer }] =
    useAddCustomerMutation();

  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForCustomerMutation();
  const newLabels = useSelector(selectAllNewLabels);

  const createAndAssignNewLabels = () => {
    const createdCustomerId = createdCustomer!.id;

    // foreach label; call create-for-customer-with-id
    newLabels.forEach((newLabel) => {
      createLabel({
        customerId: createdCustomerId,
        labelBody: newLabel,
      });
    });

    router.push("/customer");
  };
  isSuccess && createdCustomer && createAndAssignNewLabels();
  const performUpload = () => {
    const body = useSelector(selectAll);
    create(body);
  };

  return <Form edit={false} performUpload={performUpload} />;
};

CreateCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreateCustomer;
