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
    const { data } = useGetCustomerByIdQuery(customerId);
    const { firstName, lastName } = data || {};
    return `${t("Customer")} ${firstName || ""} ${lastName || ""}`;
};

const getTab = (customerId: number): ITab => ({
    path: `/customer/${customerId}`,
    label: <Label customerId={customerId} />,
});

const CustomerPusher = () => {
    const router = useRouter();
    const { customerId } = router.query;
    return <Pusher tab={getTab(+customerId!)} />;
};

export default CustomerPusher;
