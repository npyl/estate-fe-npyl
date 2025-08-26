import { useTranslation } from "react-i18next";
import { ListItem } from "src/components/List";
import { LeadSource } from "src/types/global";
import { useGlobals } from "@/sections/useGlobals";
import { FC } from "react";

interface Props {
    leadSource: LeadSource;
}

const LeadSourceListItem: FC<Props> = ({ leadSource }) => {
    const { t } = useTranslation();

    const enums = useGlobals();

    const leadSourceEnum = enums?.customer?.leadSource || [];

    let displayLeadSource = "-";
    if (leadSourceEnum && leadSource !== undefined) {
        const foundLeadSource = leadSourceEnum.find(
            ({ key }) => key === leadSource
        );
        displayLeadSource = foundLeadSource ? foundLeadSource.value : "Unknown";
    }

    return <ListItem label={t("Lead Source")} value={displayLeadSource} />;
};

export default LeadSourceListItem;
