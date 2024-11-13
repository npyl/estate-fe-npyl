import { Container, Tab, Tabs } from "@mui/material";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    SecurityProvider,
    initialData,
    useSecurityContext,
} from "@/contexts/security";
import TabPanel from "@/components/Tabs";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AdminGuard } from "@/components/authentication/admin-guard";
import dynamic from "next/dynamic";
// ...
import CompanyInformation from "./(Company)";
const Integrations = dynamic(() => import("./(Integrations)"));
const UserPage = dynamic(() => import("./components/user"));
const PermissionPage = dynamic(() => import("./components/permission"));

const SettingsPage: NextPage = () => {
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
                <UserPage changeTab={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PermissionPage />
            </TabPanel>
        </>
    );
};

SettingsPage.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>
            <SecurityProvider>{page}</SecurityProvider>
        </AdminGuard>
    </DashboardLayout>
);

export default SettingsPage;
