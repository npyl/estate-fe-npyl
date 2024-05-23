import { Container, Box, Tabs, Tab } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ViewUser from "src/components/User/View";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useTabsContext } from "src/contexts/tabs";
import { useProfileQuery } from "src/services/user";
import TabPanel from "@/components/Tabs";
// ...
import CompanyInformation from "./(Company)";
import Integrations from "./(Integrations)";

const Profile: NextPage = () => {
    const { t } = useTranslation();
    const { data: profile } = useProfileQuery();
    const { pushTab } = useTabsContext();
    const [tab, setTab] = useState(0);

    const isAdmin = profile?.isAdmin;

    useEffect(() => {
        if (profile) {
            pushTab({
                path: `/profile`,
                id: `profile-${profile.id}`,
                label: t("Profile").toString(),
            });
        }
    }, [profile, t, pushTab]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    aria-label="admin profile tabs"
                >
                    <Tab label={t("User Profile")} value={0} />
                    {isAdmin && (
                        <Tab label={t("Company Information")} value={1} />
                    )}
                    {isAdmin && <Tab label={t("Integrations")} value={2} />}
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                {profile ? <ViewUser user={profile} /> : null}
            </TabPanel>
            {isAdmin && (
                <>
                    <TabPanel value={tab} index={1}>
                        <CompanyInformation />
                    </TabPanel>
                    <TabPanel value={tab} index={2}>
                        <Integrations />
                    </TabPanel>
                </>
            )}
        </Container>
    );
};

Profile.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Profile;
