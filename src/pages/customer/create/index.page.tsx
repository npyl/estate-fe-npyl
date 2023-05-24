import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { selectAll, selectNotes, resetState as resetCustomerState } from "src/slices/customer";
import { selectAll as selectAllNewLabels, resetState as resetLabelsState } from "src/slices/labels";

import { useAddCustomerMutation } from "src/services/customers";
import { useCreateLabelForCustomerMutation } from "src/services/labels";
import { useAddNoteToCustomerWithIdMutation } from "src/services/note";

import { useDispatch } from "react-redux";

import { NextPage } from "next";
import Form from "../components/Form";

const CreateCustomer: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [create, { isSuccess: isCreateCustomerSuccess, data: createdCustomer }] =
    useAddCustomerMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForCustomerMutation();
  const [createNote, { isSuccess: isNoteSuccess }] = useAddNoteToCustomerWithIdMutation();

  const newLabels = useSelector(selectAllNewLabels);
  const newNotes = useSelector(selectNotes);
  const body = useSelector(selectAll);

  const createAndAssignNewLabels = () => {
    const createdCustomerId = createdCustomer!.id;

    // foreach label; call create-for-customer-with-id
    newLabels.forEach((newLabel) => {
      createLabel({
        customerId: createdCustomerId,
        labelBody: newLabel,
      });
    });
  };
  const createAndAssignNewNotes = () => {
    const createdCustomerId = createdCustomer!.id;

    // foreach note; call create-for-customer-with-id
    newNotes.forEach((newNote) => {
      createNote({ id: createdCustomerId, dataToSend: { content: newNote.content } })
    })
  }
  const resetState = () => {
    dispatch(resetCustomerState());
    dispatch(resetLabelsState());
  }

  const performUpload = () => {
    create(body);

    isCreateCustomerSuccess && createdCustomer && createAndAssignNewLabels(); // create&assign labels
    isCreateCustomerSuccess && createdCustomer && createAndAssignNewNotes();  // create&assign notes
    isCreateCustomerSuccess && resetState();
    isCreateCustomerSuccess && router.push("/customer");
  };

  return <Form edit={false} performUpload={performUpload} />;
};

CreateCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreateCustomer;
