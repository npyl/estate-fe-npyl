import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useEditPropertyMutation } from "src/services/properties";
import { resetState as resetLabels } from "src/slices/labels";
import {
    resetState as resetNotes,
    setInitialState as setInitialNotesState,
} from "src/slices/notes";
import { selectAll, setInitialState } from "src/slices/property";
import Form from "./Form";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { LogoProgressIndicator } from "src/components/LogoProgressIndicator";
import { useTabsContext } from "src/contexts/tabs";
import { useAutosaveTab } from "src/hooks/useAutosaveTab";

const EditPropertyPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { pushTab } = useTabsContext();
    const { propertyId } = router.query;

    const { data } = useGetPropertyByIdQuery(+propertyId!);
    const [edit, { isLoading: isEditLoading }] = useEditPropertyMutation();

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

    useAutosaveTab(selectAll, (bodyRef) => {
        if (!bodyRef.current.code) {
            toast.error("Edit operation canceled. Code ID is required");
            return;
        }
        if (!bodyRef.current.state) {
            toast.error("Edit operation canceled. State is required");
            return;
        }

        edit({ id: +propertyId!, body: bodyRef.current }).then(resetEverything);
    });

    const resetEverything = () => {
        dispatch(resetLabels());
        dispatch(resetNotes());
    };

    const handleRedirect = () => router.push(`/property/${propertyId}`);

    return (
        <>
            {data && (
                <Form
                    performUpload={handleRedirect}
                    resetEverything={resetEverything}
                    handleCancel={handleRedirect}
                />
            )}

            {
                // loading indicator (incase POST request is taking alot of time)
                isEditLoading && <LogoProgressIndicator />
            }
        </>
    );
};

EditPropertyPage.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditPropertyPage;
