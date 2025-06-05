import { ListItem } from "@/components/List";
import useGetCustomer from "@/hooks/customer";
import { useGlobals } from "@/hooks/useGlobals";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    nationality?: string;
}

const NationalityListItem: FC<Props> = ({ nationality }) => {
    const { t } = useTranslation();

    const { customer } = useGetCustomer();

    const enums = useGlobals();

    const nationalitiesEnum = enums?.customer?.nationality || [];

    let displayNationality = "-";

    if (nationalitiesEnum && customer?.nationality !== undefined) {
        const foundNationality = nationalitiesEnum.find(
            ({ key }) => key === nationality
        );

        displayNationality = foundNationality
            ? foundNationality.value
            : "Unknown";
    }

    return (
        <ListItem label={t("Nationality")} value={displayNationality || "-"} />
    );
};

export default NationalityListItem;
