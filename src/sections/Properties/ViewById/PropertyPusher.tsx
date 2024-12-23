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
    return `${t("Property")} ${data?.code || ""}`;
};

const getTab = (propertyId: number): ITab => ({
    path: `/property/${propertyId}`,
    label: <Label propertyId={propertyId} />,
});

const PropertyPusher = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    return <Pusher tab={getTab(+propertyId!)} />;
};

export default PropertyPusher;
