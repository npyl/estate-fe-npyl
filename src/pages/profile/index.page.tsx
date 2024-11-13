import { Container, Tabs, Tab } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ViewUser from "@/sections/User/View";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useTabsContext } from "src/contexts/tabs";
import { useGetUserQuery } from "src/services/user";
import TabPanel from "@/components/Tabs";

import { AuthGuard } from "@/components/authentication/auth-guard";

import { useAuth } from "@/hooks/use-auth";

const Profile: NextPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { data: profile } = useGetUserQuery(+user?.id!);
    const { pushTab } = useTabsContext();
    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (profile) {
            pushTab({
                path: `/profile`,
                id: `profile-${profile.id}`,
                label: t("Profile").toString(),
            });
        }
    }, [profile, t, pushTab]);

    const handleTabChange = (_: any, v: number) => setTab(v);

    return (
        <Container maxWidth="md">
            <Tabs value={tab} onChange={handleTabChange}>
                <Tab label={t("User Profile")} value={0} />
            </Tabs>
            <TabPanel value={tab} index={0}>
                {profile ? <ViewUser user={profile} /> : null}
            </TabPanel>
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
