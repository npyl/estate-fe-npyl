import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useEditPropertyMutation } from "src/services/properties";
import { resetState as resetLabels } from "src/slices/labels";
import { resetAll, selectAll } from "src/slices/property";
import {
    resetState as resetNotes,
    setInitialState as setInitialNotesState,
} from "src/slices/notes";
import { setInitialState } from "src/slices/property";
import Form from "./Form";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTabsContext } from "src/contexts/tabs";
import { ConfirmationDialogBox } from "src/pages/components/ConfirmationDialogBox";
import { useSelector } from "react-redux";

// (1): forces Form re-render (=> unmount when changing from /edit/x to /edit/y pages)

const EditPropertyPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pushTab } = useTabsContext();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const [edit, { isError }] = useEditPropertyMutation();

    const body = useSelector(selectAll);

    const [clearConfirmDialogOpen, setclearConfirmDialogOpen] = useState(false);

    useEffect(() => {
        if (data && propertyId) {
            const isFirstEdit = data.createdAt === data.updatedAt;
            const label = `${isFirstEdit ? "Create" : "Edit"} property ${
                data?.code || ""
            }`;

            pushTab({
                path: `/property/edit/${propertyId}`,
                id: (propertyId + "edit") as string,
                label,
            });

            dispatch(setInitialNotesState(data.notes));
            dispatch(setInitialState({ data, id: +propertyId! }));
        }
    }, [data, propertyId]);

    const resetEverything = () => setclearConfirmDialogOpen(true);
    const closeClearConfirmDialog = () => setclearConfirmDialogOpen(false);

    const confirmResetEverything = useCallback(() => {
        dispatch(resetLabels());
        dispatch(resetNotes());
        dispatch(resetAll());
        closeClearConfirmDialog();
    }, []);

    const handleEdit = useCallback(
        () => body && edit({ body, id: +propertyId! }).then(redirectToView),
        [body]
    );

    const redirectToView = useCallback(
        () => router.push(`/property/${propertyId}`),
        []
    );

    return (
        <>
            <Form
                key={propertyId as string} // (1)
                isError={isError}
                performEdit={handleEdit}
                resetEverything={resetEverything}
                handleCancel={redirectToView}
            />

            <ConfirmationDialogBox
                action={"delete"}
                open={clearConfirmDialogOpen}
                onClose={closeClearConfirmDialog}
                text="Are you sure you want to clear all fields?"
                onConfirm={confirmResetEverything}
            />
        </>
    );
};

EditPropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditPropertyPage;
