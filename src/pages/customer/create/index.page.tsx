import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { selectAll } from "src/slices/customer";
import { resetState as resetNotesState } from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import Form from "../components/Form";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import { useSelector } from "react-redux";

const CreateCustomer: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [create, { isError }] = useCreateOrUpdateCustomerMutation();

    const body = useSelector(selectAll);

    const resetEverything = useCallback(() => {
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    }, []);

    useEffect(() => {
        resetEverything();
    }, []);

    const handleSave = useCallback(
        () =>
            create(body)
                .unwrap()
                .then((id) => router.push(`/customer/${id}`)),
        [body]
    );

    const handleCancel = useCallback(() => {
        router.back();
    }, []);

    return (
        <Form
            isError={isError}
            performSave={handleSave}
            resetState={resetEverything}
            handleCancel={handleCancel}
        />
    );
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
