import { Container, Tab, Tabs } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabPanel from "../../components/Tabs/Tabs";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { UserDashboardLayout } from "../../components/dashboard/user-dashboard-layout";
import PermissionPage from "./components/permission";
import UserPage from "./components/user";

const User: NextPage = () => {
    const [value, setValue] = useState(0);
    const [selectedUser, setSelectedUser] = useState<number>(-1);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        newValue === 0 && setSelectedUser(-1);
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
                <Tab label={t("" + "Permissions")} {...a11yProps(1)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <UserPage
                    changeTab={handleChange}
                    setSelectedUser={setSelectedUser}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PermissionPage selectedUser={selectedUser} />
            </TabPanel>
        </Container>
    );
};

User.getLayout = (page) => (
    <AuthGuard>
        <UserDashboardLayout>{page}</UserDashboardLayout>
    </AuthGuard>
);

export default User;

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
