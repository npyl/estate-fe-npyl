import { FC } from "react";
import Tab, { TabProps } from "@mui/material/Tab";
import { useTranslation } from "react-i18next";

// -----------------------------------------------------------

const getTabId = (name: string) => `Tab-${name}`;

// -----------------------------------------------------------

interface TranslatedTabProps extends Omit<TabProps, "label"> {
    label: string;
}

const TranslatedTab: FC<TranslatedTabProps> = ({ label, ...props }) => {
    const { t } = useTranslation();
    return <Tab label={t(label)} {...props} />;
};

// -----------------------------------------------------------

const getTab = (name: string) => {
    const id = getTabId(name);
    return <TranslatedTab key={name} id={id} label={name} value={name} />;
};

// -----------------------------------------------------------

export { getTabId };
export default getTab;
