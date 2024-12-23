import { useRouter } from "next/router";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useTranslation } from "react-i18next";
import Pusher from "@/sections/Pusher";
import { ITab } from "@/types/tabs";
import { FC } from "react";

interface LabelProps {
    customerId: number;
}

const Label: FC<LabelProps> = ({ customerId }) => {
    const { t } = useTranslation();

    const { data: c } = useGetCustomerByIdQuery(customerId);

    const { createdAt, updatedAt, firstName, lastName } = c || {};

    const isFirstEdit = createdAt === updatedAt;
    const title = isFirstEdit ? t("Create") : t("Edit");
    const fullname = firstName && lastName ? `${firstName} ${lastName}` : "";
    const label = `${title} ${t("Customer_geniki")} ${fullname}`;

    return label;
};

const getTab = (customerId: number): ITab => {
    return {
        path: `/customer/edit/${customerId}`,
        label: <Label customerId={customerId} />,
    };
};

const CustomerPusher = () => {
    const router = useRouter();
    const { customerId } = router.query;
    return <Pusher tab={getTab(+customerId!)} />;
};

export default CustomerPusher;
