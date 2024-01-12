import type { NextPage } from "next";
import { useRouter } from "next/router";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useEditPropertyMutation } from "src/services/properties";
import { resetState as resetLabels } from "src/slices/labels";
import { resetAll } from "src/slices/property";
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

// (1): forces Form re-render (=> unmount when changing from /edit/x to /edit/y pages)

const EditPropertyPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pushTab } = useTabsContext();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const [edit, { isError }] = useEditPropertyMutation();

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

    const handleAutosave = (bodyRef: MutableRefObject<any>) => {
        if (!bodyRef.current.code) {
            toast.error("Edit operation canceled. Code ID is required");
            return;
        }
        if (!bodyRef.current.state) {
            toast.error("Edit operation canceled. State is required");
            return;
        }

        edit({ id: +propertyId!, body: bodyRef.current }).then(resetEverything);
    };

    const resetEverything = () => setclearConfirmDialogOpen(true);
    const closeClearConfirmDialog = () => setclearConfirmDialogOpen(false);

    const confirmResetEverything = useCallback(() => {
        dispatch(resetLabels());
        dispatch(resetNotes());
        dispatch(resetAll());
        closeClearConfirmDialog();
    }, []);

    const handleRedirect = useCallback(
        () => router.push(`/property/${propertyId}`),
        []
    );

    return (
        <>
            <Form
                key={propertyId as string} // (1)
                isError={isError}
                onAutosave={handleAutosave}
                performEdit={handleRedirect}
                resetEverything={resetEverything}
                handleCancel={handleRedirect}
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
