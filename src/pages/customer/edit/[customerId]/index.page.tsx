import type { NextPage } from "next";
import { MutableRefObject, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useTabsContext } from "src/contexts/tabs";
import {
    useCreateOrUpdateCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import {
    selectAll,
    setInitialState as setInitialCustomerState,
} from "src/slices/customer";
import {
    setInitialState as setInitialNotesState,
    resetState as resetNotesState,
} from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import Form from "../../components/Form";
import { useAutosaveTab } from "src/hooks/useAutosaveTab";

// (1): forces Form re-render (=> unmount when changing from /edit/x to /edit/y pages)

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pushTab } = useTabsContext();
    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [edit, { isError }] = useCreateOrUpdateCustomerMutation();

    useEffect(() => {
        if (data && customerId) {
            const isFirstEdit = data.createdAt === data.updatedAt;
            const label = `${isFirstEdit ? "Create" : "Edit"} customer ${
                (data?.firstName &&
                    data?.lastName &&
                    `${data.firstName} ${data.lastName}`) ||
                ""
            }`;

            pushTab({
                path: `/customer/edit/${customerId}`,
                id: (customerId + "edit") as string,
                label,
            });

            dispatch(setInitialNotesState(data.notes));
            dispatch(setInitialCustomerState(data));
        }
    }, [data, customerId]);

    const handleAutosave = (bodyRef: MutableRefObject<any>) =>
        bodyRef.current?.id &&
        edit({ ...bodyRef.current, id: +customerId! }).then(resetEverything);

    useAutosaveTab(selectAll, handleAutosave);

    const resetEverything = () => {
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    };

    const handleRedirect = () => router.push(`/customer/${customerId}`);

    return (
        <Form
            key={customerId as string} // (1)
            isError={isError}
            performSave={handleRedirect}
            resetState={resetEverything}
            handleCancel={handleRedirect}
        />
    );
};

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
