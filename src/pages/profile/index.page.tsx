import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ViewUser from "src/components/User/View";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useTabsContext } from "src/contexts/tabs";
import { useProfileQuery } from "src/services/user";

const Profile: NextPage = () => {
    const { t } = useTranslation();
    const { data: profile } = useProfileQuery();
    const { pushTab } = useTabsContext();

    useEffect(() => {
        if (profile) {
            pushTab({
                path: `/profile`,
                id: `profile-${profile.id}`,
                label: t("Profile").toString(),
            });
        }
    }, [profile, t]);

    return (
        <Container maxWidth="md">
            {profile ? <ViewUser user={profile} /> : null}
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
