import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import Form from "./components/Form";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import { useCallback } from "react";
import { dispatch } from "src/store";
import { useRouter } from "next/router";

import { resetState as resetNotesState } from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import { useSelector } from "react-redux";
import { selectAll } from "src/slices/customer";

// (1): forces Form re-render (=> unmount when changing from /edit/x to /edit/y pages)

const CreateCustomer: NextPage = () => {
    const router = useRouter();

    const [create, { isError }] = useCreateOrUpdateCustomerMutation();

    const body = useSelector(selectAll);

    const handleSave = useCallback(
        () =>
            create(body)
                .unwrap()
                .then((res) => router.push(`/customer/${res}`)),
        [body]
    );

    const resetEverything = useCallback(() => {
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    }, []);

    const handleRedirect = useCallback(() => router.back(), []);

    return (
        <Form
            key={undefined} // (1)
            isError={isError}
            performSave={handleSave}
            resetState={resetEverything}
            handleCancel={handleRedirect}
        />
    );
};

CreateCustomer.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default CreateCustomer;
