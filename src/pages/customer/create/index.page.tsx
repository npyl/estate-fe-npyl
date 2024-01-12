import type { NextPage } from "next";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { selectAll } from "src/slices/customer";
import { resetState as resetNotesState } from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";
import Form from "../components/Form";
import { useAutosaveTab } from "src/hooks/useAutosaveTab";
import { useCreateOrUpdateCustomerMutation } from "src/services/customers";
import { useSelector } from "react-redux";

const CreateCustomer: NextPage = () => {
    const router = useRouter();
    const goingBackRef = useRef<boolean>(false);
    const dispatch = useDispatch();

    const [create, { isError, isSuccess }] =
        useCreateOrUpdateCustomerMutation();

    const body = useSelector(selectAll);

    const resetEverything = useCallback(() => {
        dispatch(resetLabelsState());
        dispatch(resetNotesState());
    }, []);

    useEffect(() => {
        resetEverything();
    }, []);

    useAutosaveTab(
        selectAll,
        (bodyRef: MutableRefObject<any>) =>
            !isSuccess && // INFO: prevent autosave when user hits save button (<=> double-save)
            create({ ...bodyRef.current })
    );

    const handleSave = useCallback(
        () =>
            create(body)
                .unwrap()
                .then((id) => router.push(`/customer/${id}`)),
        [body]
    );

    const handleCancel = useCallback(() => router.back(), []);

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
