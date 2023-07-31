import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

const EditCustomer: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { customerId } = router.query;
    const { data, isSuccess: fetchedCustomer } = useGetCustomerByIdQuery(
        parseInt(customerId as string)
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

    const performUpload = () => {
        edit({ customerId: +customerId!, body });
    };

    useEffect(() => {
        if (fetchedCustomer) {
            dispatch(setInitialNotesState(data.notes));
            dispatch(setInitialState(data));
        }
    }, [fetchedCustomer]);

    useEffect(() => {
        if (isEditedSuccess && editedCustomer) {
            router.push("/customer");
        }
    }, [isEditedSuccess, editedCustomer]);

    return (
        <>
            <Form edit={true} performUpload={performUpload} />

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
