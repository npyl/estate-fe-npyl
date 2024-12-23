import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import {
    useEditPropertyMutation,
    useGetPropertyByIdQuery,
} from "src/services/properties";
import Form from "./Form";
import { IPropertiesPOST } from "src/types/properties";
import dynamic from "next/dynamic";
const PropertyPusher = dynamic(
    () => import("@/sections/Properties/Edit/PropertyPusher")
);

const useLoadProperty = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data: property } = useGetPropertyByIdQuery(+propertyId!);
    return { property, propertyId };
};

const EditPropertyPage: NextPage = () => {
    const router = useRouter();

    const { property, propertyId } = useLoadProperty();
    const [edit] = useEditPropertyMutation();

    const handleEdit = useCallback(
        (body: IPropertiesPOST) =>
            edit({ body, id: +propertyId! }).then(redirectToView),

        [propertyId]
    );

    const redirectToView = useCallback(() => {
        router.push(`/property/${propertyId}`);
    }, [propertyId]);

    return (
        <Form
            property={property}
            onSave={handleEdit}
            onCancel={redirectToView}
        />
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
