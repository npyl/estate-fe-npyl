import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ViewUser from "@/sections/User/View";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useTabsContext } from "src/contexts/tabs";
import { useGetUserQuery } from "src/services/user";

import { AuthGuard } from "@/components/authentication/auth-guard";

import { useAuth } from "@/hooks/use-auth";

const Profile: NextPage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { data: profile } = useGetUserQuery(+user?.id!);
    const { pushTab } = useTabsContext();

    useEffect(() => {
        if (profile) {
            pushTab({
                path: `/profile`,
                label: t("Profile").toString(),
            });
        }
    }, [profile, t, pushTab]);

    if (!profile) return null;

    return (
        <Container maxWidth="md">
            <ViewUser user={profile} />
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
