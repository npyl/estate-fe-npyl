import { Container, Tabs, Tab } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ViewUser from "@/sections/User/View";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useTabsContext } from "src/contexts/tabs";
import { useProfileQuery } from "src/services/user";
import TabPanel from "@/components/Tabs";
// ...
const CompanyInformation = dynamic(() => import("./(Company)"));
const Integrations = dynamic(() => import("./(Integrations)"));

import { AuthGuard } from "@/components/authentication/auth-guard";

import dynamic from "next/dynamic";

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

    const handleTabChange = (_: any, v: number) => setTab(v);

    return (
        <Container maxWidth="md">
            <Tabs value={tab} onChange={handleTabChange}>
                <Tab label={t("User Profile")} value={0} />
                {isAdmin && <Tab label={t("Company Information")} value={1} />}
                {isAdmin && <Tab label={t("Integrations")} value={2} />}
            </Tabs>
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
