import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useProfileQuery } from "src/services/user";
import { useTabsContext } from "src/contexts/tabs";
import ViewUser from "src/components/User/View";
import { SecurityProvider } from "src/contexts/security";

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

    return (
        <Grid container spacing={1} mt={1}>
            <Grid item xs={3.5} />
            <Grid item xs={5} order={"row"}>
                {profile && <ViewUser user={profile} />}
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
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
