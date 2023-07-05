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
import { useCreateLabelForCustomerWithIDMutation } from "src/services/labels";
import { useAddNoteToCustomerWithIdMutation } from "src/services/note";

import { setInitialState, selectAll } from "src/slices/customer";
import { selectAll as selectAllNewLabels } from "src/slices/labels";
import { selectAll as selectAllNewNotes, setInitialState as setInitialNotesState } from 'src/slices/notes';
import { useDispatch } from "src/store";
import Form from "../../components/Form";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";

const EditCustomer: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { customerId } = router.query;
  const { data, isSuccess: fetchedCustomer } = useGetCustomerByIdQuery(
    parseInt(customerId as string)
  );
  const [edit, { isSuccess: isEditedSuccess, isLoading: isEditedLoading, data: editedCustomer }] = useAddCustomerMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForCustomerWithIDMutation();
  const [createNote, { isSuccess: isNoteSuccess }] =
    useAddNoteToCustomerWithIdMutation();

  const newLabels = useSelector(selectAllNewLabels);
  const newNotes = useSelector(selectAllNewNotes);
  const body = useSelector(selectAll);

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
  const createAndAssignNewNotes = () => {
    const editedCustomerId = editedCustomer!.id;

    // foreach note; call create-for-customer-with-id
    newNotes.forEach(async (newNote) => {
      await createNote({
        id: editedCustomerId,
        dataToSend: { content: newNote.content },
      });
    });
  };

  useEffect(() => {
    if (fetchedCustomer) {
      dispatch(setInitialNotesState(data.notes));
      dispatch(setInitialState(data));
    }
  }, [fetchedCustomer]);

  useEffect(() => {
    if (isEditedSuccess && editedCustomer) {
      createAndAssignNewLabels(); // create&assign labels
      createAndAssignNewNotes(); // create&assign notes
      router.push('/customer');
    }
  }, [isEditedSuccess, editedCustomer])

  return <>
    <Form edit={true} performUpload={performUpload} />

    {
      // loading indicator (incase POST request is taking alot of time)
      isEditedLoading && <LogoProgressIndicator />
    }
  </>
};

EditCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default EditCustomer;
