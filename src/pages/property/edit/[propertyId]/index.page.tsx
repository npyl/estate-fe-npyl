import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useEditPropertyMutation } from "src/services/properties";
import Form from "./Form";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useTabsContext } from "src/contexts/tabs";
import { ConfirmationDialogBox } from "src/pages/components/ConfirmationDialogBox";
import { IPropertiesPOST } from "src/types/properties";

const EditPropertyPage: NextPage = () => {
    const router = useRouter();
    const { pushTab } = useTabsContext();
    const { propertyId } = router.query;

    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    const [edit, { isError, isLoading }] = useEditPropertyMutation();

    const [clearConfirmDialogOpen, setclearConfirmDialogOpen] = useState(false);

    useEffect(() => {
        if (property && propertyId) {
            const isFirstEdit = property.createdAt === property.updatedAt;
            const label = `${isFirstEdit ? "Create" : "Edit"} property ${
                property?.code || ""
            }`;

            pushTab({
                path: `/property/edit/${propertyId}`,
                id: (propertyId + "edit") as string,
                label,
            });
        }
    }, [property, propertyId]);

    const handleEdit = useCallback(
        (body: IPropertiesPOST) =>
            edit({ body, id: +propertyId! }).then(redirectToView),
        []
    );

    const redirectToView = useCallback(
        () => router.push(`/property/${propertyId}`),
        []
    );

    const resetEverything = () => setclearConfirmDialogOpen(true);
    const closeClearConfirmDialog = () => setclearConfirmDialogOpen(false);

    return (
        <>
            <Form
                property={property}
                isLoading={isLoading}
                isError={isError}
                onSave={handleEdit}
                onClear={resetEverything}
                onCancel={redirectToView}
            />

            <ConfirmationDialogBox
                action={"delete"}
                open={clearConfirmDialogOpen}
                onClose={closeClearConfirmDialog}
                text="Are you sure you want to clear all fields?"
                onConfirm={closeClearConfirmDialog}
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
