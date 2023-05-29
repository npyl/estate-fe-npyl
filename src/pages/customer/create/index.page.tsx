import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { NextPage } from "next";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { selectAll } from "src/slices/customer";
import { selectAll as selectAllNewNotes } from 'src/slices/customer/notes';
import { selectAll as selectAllNewLabels } from "src/slices/labels";

import { useAddCustomerMutation } from "src/services/customers";
import { useCreateLabelForCustomerWithIDMutation } from "src/services/labels";
import { useAddNoteToCustomerWithIdMutation } from "src/services/note";

import Form from "../components/Form";

const CreateCustomer: NextPage = () => {
  const router = useRouter();

  const [
    create,
    { isSuccess: isCreateCustomerSuccess, data: createdCustomer },
  ] = useAddCustomerMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForCustomerWithIDMutation();
  const [createNote, { isSuccess: isNoteSuccess }] =
    useAddNoteToCustomerWithIdMutation();

  const newLabels = useSelector(selectAllNewLabels);
  const newNotes = useSelector(selectAllNewNotes);
  const body = useSelector(selectAll);

  const createAndAssignNewLabels = () => {
    const createdCustomerId = createdCustomer!.id;

    // foreach label; call create-for-customer-with-id
    newLabels.forEach(async (newLabel) => {
      await createLabel({
        customerId: createdCustomerId,
        labelBody: newLabel,
      });
    });
  };
  const createAndAssignNewNotes = () => {
    const createdCustomerId = createdCustomer!.id;

    // foreach note; call create-for-customer-with-id
    newNotes.forEach(async (newNote) => {
      await createNote({
        id: createdCustomerId,
        dataToSend: { content: newNote.content },
      });
    });
  };

  const performUpload = () => {
    create(body);
  };

  useEffect(() => {
    if (isCreateCustomerSuccess && createdCustomer) {
      createAndAssignNewLabels(); // create&assign labels
      createAndAssignNewNotes(); // create&assign notes
      router.push("/customer");
    }
  }, [isCreateCustomerSuccess, createdCustomer]);

  return <Form performUpload={performUpload} />;
};

CreateCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreateCustomer;
