import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";
import { FC } from "react";
import { useGetPropertyByIdQuery } from "@/services/properties";

interface LabelProps {
    propertyId: number;
}

const Label: FC<LabelProps> = ({ propertyId }) => {
    const { t } = useTranslation();
    const { data } = useGetPropertyByIdQuery(propertyId);
    const { code, createdAt, updatedAt } = data || {};

    const isFirstEdit = createdAt === updatedAt;

    const label = `${isFirstEdit ? t("Create") : t("Edit")} ${t(
        "Property_geniki"
    )} ${code || ""}`;

    return label;
};

const getTab = (propertyId: number): ITab => ({
    path: `/property/edit/${propertyId}`,
    label: <Label propertyId={propertyId} />,
});

const PropertyPusher = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    return <Pusher tab={getTab(+propertyId!)} />;
};

export default PropertyPusher;
