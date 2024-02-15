import { Grid, Tab, Tabs } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    SecurityProvider,
    initialData,
    useSecurityContext,
} from "src/contexts/security";
import TabPanel from "../../components/Tabs";
import PermissionPage from "./components/permission";
import UserPage from "./components/user";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { AdminGuard } from "src/components/authentication/admin-guard";

const SecurityPage: NextPage = () => {
    const { t } = useTranslation();

    const { setSelectedUser, setSelectedPreset, setTargetUser, setData } =
        useSecurityContext();

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if (newValue === 0) {
            setSelectedUser(-1);
            setSelectedPreset(-1);
            setTargetUser(-1);
            setData(initialData);
        }
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="View Property Tabs"
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
            </Grid>
        </Grid>
    );
};

SecurityPage.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AdminGuard>
);

export default SecurityPage;

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
