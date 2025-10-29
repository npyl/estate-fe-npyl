import { Tab } from "@mui/material";
import { ComponentType, useMemo } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "@/components/Tabs/TabPanel";
import Tabs, { useCurrentTab } from "@/components/Tabs";
import dynamic from "next/dynamic";
import CompanyInformation from "@/sections/Settings/Company";
import { TranslationType } from "@/types/translation";
import { ROLE_TAB_ID } from "./constant";
const Integrations = dynamic(() => import("@/sections/Settings/Integrations"));
const RolesTab = dynamic(() => import("@/sections/Settings/Roles"));
const UsersAndPermissions = dynamic(
    () => import("@/sections/Settings/UsersAndPermissions")
);

type TTab = { id: number; label: string; View: ComponentType };

const getTABS = (t: TranslationType): TTab[] => [
    { id: 0, label: t("Company Information"), View: CompanyInformation },
    { id: 1, label: t("Integrations"), View: Integrations },
    {
        id: 2,
        label: t("USERS_AND_PERMISSIONS"),
        View: UsersAndPermissions,
    },
    { id: ROLE_TAB_ID, label: t("PERMISSIONS_Roles"), View: RolesTab },
];

const getTab = ({ id, label }: TTab) => <Tab key={id} label={label} />;
const getView =
    (value: number) =>
    ({ id, View }: TTab) => (
        <TabPanel key={id} value={value} index={id}>
            <View />
        </TabPanel>
    );

const Settings = () => {
    const { t } = useTranslation();

    const [value] = useCurrentTab();

    const TABS = useMemo(() => getTABS(t), [t]);

    return (
        <>
            <Tabs>{TABS.map(getTab)}</Tabs>
            {TABS.map(getView(value))}
        </>
    );
};

export default Settings;
