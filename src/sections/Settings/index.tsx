import { Container, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { initialData, useSecurityContext } from "@/contexts/security";
import TabPanel from "@/components/Tabs";
import dynamic from "next/dynamic";
// ...
import CompanyInformation from "@/sections/Settings/Company";
const Integrations = dynamic(() => import("@/sections/Settings/Integrations"));
const UserPage = dynamic(() => import("@/sections/Settings/user"));
const PermissionPage = dynamic(() => import("@/sections/Settings/permission"));

const Settings = () => {
    const { t } = useTranslation();

    const { setSelectedUser, setSelectedPreset, setTargetUser, setData } =
        useSecurityContext();

    const [value, setValue] = useState(0);

    const handleChange = useCallback((_: any, newValue: number) => {
        setValue(newValue);

        if (newValue === 0) {
            setSelectedUser(-1);
            setSelectedPreset(-1);
            setTargetUser(-1);
            setData(initialData);
        }
    }, []);

    const gotoPermissions = useCallback(() => handleChange({}, 3), []);

    return (
        <>
            <Tabs value={value} onChange={handleChange}>
                <Tab label={t("Company Information")} />
                <Tab label={t("Integrations")} />
                <Tab label={t("Users")} />
                <Tab label={t("Permissions")} />
            </Tabs>

            <Container maxWidth="md">
                <TabPanel value={value} index={0}>
                    <CompanyInformation />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Integrations />
                </TabPanel>
            </Container>
            <TabPanel value={value} index={2}>
                <UserPage onGotoPermissions={gotoPermissions} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PermissionPage />
            </TabPanel>
        </>
    );
};

export default Settings;
