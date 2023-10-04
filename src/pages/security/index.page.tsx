import { Container, Tab, Tabs } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    SecurityProvider,
    initialData,
    useSecurityContext,
} from "src/contexts/security";
import TabPanel from "../../components/Tabs/Tabs";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { UserDashboardLayout } from "../../components/dashboard/user-dashboard-layout";
import PermissionPage from "./components/permission";
import UserPage from "./components/user";

const SecurityPage: NextPage = () => {
    const [value, setValue] = useState(0);
    const { setSelectedUser, setSelectedPreset, setTargetUser, setData } =
        useSecurityContext();
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 0) {
            setSelectedUser(-1);
            setSelectedPreset(-1);
            setTargetUser(-1);
            setData(initialData);
        }
    };

    const { t } = useTranslation();

    return (
        <Container maxWidth={"xl"}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="View Property Tabs"
                sx={{ padding: 2 }}
            >
                <Tab label={t("Users")} {...a11yProps(0)} />
                <Tab label={t("Permissions")} {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <UserPage changeTab={handleChange} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PermissionPage />
            </TabPanel>
        </Container>
    );
};

SecurityPage.getLayout = (page) => (
    <AuthGuard>
        <UserDashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </UserDashboardLayout>
    </AuthGuard>
);

export default SecurityPage;

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
