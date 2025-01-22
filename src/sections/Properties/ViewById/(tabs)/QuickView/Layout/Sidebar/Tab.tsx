import { FC, ReactNode } from "react";
import Tab, { TabProps } from "@mui/material/Tab";
import isNamedComponent from "../isNamedComponent";
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

const getTab = (content: ReactNode) => {
    if (!isNamedComponent(content)) {
        throw new Error("Invalid section component");
    }

    const name = content.type.name;
    const id = getTabId(name);

    return <TranslatedTab key={name} id={id} label={name} value={name} />;
};

export { getTabId };
export default getTab;
