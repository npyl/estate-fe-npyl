import * as React from "react";
import { useTranslation } from "react-i18next";
import { ViewLocation } from "src/components/Location/View";
import ViewPanel from "@/components/Panel/View";
import useOrganization from "@/sections/Organization/useOrganization";

const AddressSection: React.FC = () => {
    const { t } = useTranslation();
    const { data } = useOrganization();
    const location = data?.location;

    if (!location) return null;

    return (
        <ViewPanel label={t("Address")}>
            <ViewLocation location={location} />
        </ViewPanel>
    );
};

export default AddressSection;
