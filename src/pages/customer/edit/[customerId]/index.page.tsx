import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useGetCustomerByIdQuery,
    useEditCustomerMutation,
} from "src/services/customers";
import { setInitialState, selectAll } from "src/slices/customer";
import { setInitialState as setInitialNotesState } from "src/slices/notes";
import { useDispatch } from "src/store";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import Form from "./components/Form";

import { resetState as resetCustomerState } from "src/slices/customer";
import { resetState as resetNotesState } from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import { usePublishTab } from "src/components/Tabs/utils";

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { customerId } = router.query;

    const [everythingIsClear, setEverythingIsClear] = useState(false);

    const { data, isSuccess: fetchedCustomer } = useGetCustomerByIdQuery(
        +customerId!
    );
    const [
        edit,
        {
            isSuccess: isEditedSuccess,
            isLoading: isEditedLoading,
            data: editedCustomer,
        },
    ] = useEditCustomerMutation();

    const body = useSelector(selectAll);

    usePublishTab(
        {
            title:
                data?.firstName && data?.lastName ? "Edit " : "Edit Customer",
            path: `/customer/edit/${customerId}`,
        },
        data?.firstName && data?.lastName
            ? `${data?.firstName} ${data?.lastName}`
            : `${data?.id}`
    );

    useEffect(() => {
        if (everythingIsClear && fetchedCustomer) {
            dispatch(setInitialNotesState(data.notes));
            dispatch(setInitialState(data));
        }
    }, [everythingIsClear, fetchedCustomer]);

    useEffect(() => {
        if (isEditedSuccess && editedCustomer) {
            router.push("/customer");
        }
    }, [isEditedSuccess, editedCustomer]);

    useEffect(() => {
        resetState();
        setEverythingIsClear(true);
    }, []);

    const resetState = () => {
        dispatch(resetCustomerState());
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    };

    const performUpload = () => {
        edit({ customerId: +customerId!, body });
    };

    return (
        <>
            <Form performUpload={performUpload} resetState={resetState} />

            {
                // loading indicator (incase POST request is taking alot of time)
                isEditedLoading && <LogoProgressIndicator />
            }
        </>
    );
};

EditCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditCustomer;
