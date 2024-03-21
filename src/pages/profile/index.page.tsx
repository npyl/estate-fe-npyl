import Box from "@mui/material/Box";
import type { NextPage } from "next";
import { useEffect } from "react";
import ViewUser from "src/components/User/View";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useTabsContext } from "src/contexts/tabs";
import { useProfileQuery } from "src/services/user";

const Profile: NextPage = () => {
    const { data: profile } = useProfileQuery();
    const { pushTab } = useTabsContext();

    useEffect(() => {
        if (profile) {
            pushTab({
                path: `/profile`,
                id: `profile-${profile.id}`,
                label: `Profile`,
            });
        }
    }, [profile]);

    return <Box paddingY={4}>{profile && <ViewUser user={profile} />}</Box>;
};

Profile.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Profile;
