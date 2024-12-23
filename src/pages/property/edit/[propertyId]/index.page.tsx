import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useEditPropertyMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";
import Form from "./Form";
import { useTabsContext } from "src/contexts/tabs";
import ConfirmationDialogBox from "@/sections/ConfirmationDialogBox";
import { IPropertiesPOST } from "src/types/properties";
import PropertyPusher from "./PropertyPusher";

const useLoadProperty = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    return { property, propertyId };
};

const EditPropertyPage: NextPage = () => {
    const router = useRouter();
    const { removeTab } = useTabsContext();

    const { property, propertyId } = useLoadProperty();
    const [edit, { isError, isLoading }] = useEditPropertyMutation();

    const [clearConfirmDialogOpen, setclearConfirmDialogOpen] = useState(false);

    const handleEdit = useCallback(
        (body: IPropertiesPOST) =>
            edit({ body, id: +propertyId! }).then(redirectToView),

        [propertyId]
    );

    const redirectToView = useCallback(() => {
        router.push(`/property/${propertyId}`);
        removeTab((propertyId + "edit") as string);
    }, [propertyId]);

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
        <DashboardLayout>
            <PropertyPusher />
            {page}
        </DashboardLayout>
    </AuthGuard>
);

export default EditPropertyPage;
