import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useEditPropertyMutation,
    useLazyGetPropertyByIdQuery,
} from "src/services/properties";
import Form from "./Form";
import { useTabsContext } from "src/contexts/tabs";
import ConfirmationDialogBox from "@/sections/ConfirmationDialogBox";
import { IPropertiesPOST } from "src/types/properties";
import { useTranslation } from "react-i18next";

const useLoadProperty = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const { pushTab } = useTabsContext();

    const [getProperty, { data: property }] = useLazyGetPropertyByIdQuery();

    const { propertyId } = router.query;

    useEffect(() => {
        if (!propertyId) return;

        getProperty(+propertyId!)
            .unwrap()
            .then((p) => {
                const isFirstEdit = p.createdAt === p.updatedAt;
                const label = `${isFirstEdit ? t("Create") : t("Edit")} ${t(
                    "Property_geniki"
                )} ${p.code || ""}`;

                pushTab({
                    path: `/property/edit/${propertyId}`,
                    id: (propertyId + "edit") as string,
                    label,
                });
            });
    }, [propertyId, t]);

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
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default EditPropertyPage;
