import * as React from "react";
import { useTranslation } from "react-i18next";
import { ViewLocation } from "src/components/Location/View";
import useGetCustomer from "@/hooks/customer";
import ViewPanel from "@/components/Panel/View";

const AddressSection: React.FC = () => {
    const { t } = useTranslation();
    const { customer } = useGetCustomer();
    const location = customer?.location;

    if (!location) return null;

    return (
        <ViewPanel label={t("Address")}>
            <ViewLocation location={location} />
        </ViewPanel>
    );
};

export default AddressSection;
