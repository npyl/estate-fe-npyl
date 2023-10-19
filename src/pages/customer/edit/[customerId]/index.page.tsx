import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { useTabsContext } from "src/contexts/tabs";
import {
    useEditCustomerMutation,
    useGetCustomerByIdQuery,
} from "src/services/customers";
import {
    selectAll,
    setInitialState as setInitialCustomerState,
    resetState as resetCustomerState,
} from "src/slices/customer";
import {
    setInitialState as setInitialNotesState,
    resetState as resetNotesState,
} from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import Form from "./components/Form";
import { useAutosaveTab } from "src/hooks/useAutosaveTab";

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pushTab } = useTabsContext();
    const { customerId } = router.query;

    const { data } = useGetCustomerByIdQuery(+customerId!);
    const [edit, { isLoading: isEditLoading }] = useEditCustomerMutation();

    useAutosaveTab(selectAll, (bodyRef) => {
        if (bodyRef.current && bodyRef.current.id) {
            edit({ customerId: +customerId!, body: bodyRef.current }).then(
                () => {
                    resetEverything();
                }
            );
        }
    });

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

    const resetEverything = () => {
        dispatch(resetCustomerState());
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    };

    const handleRedirect = () => router.push(`/customer/${customerId}`);

    return (
        <>
            <Form
                performUpload={handleRedirect}
                resetState={resetEverything}
                handleCancel={handleRedirect}
            />
            {isEditLoading && <LogoProgressIndicator />}
        </>
    );
};

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
