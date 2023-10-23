import { Grid } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllUsersQuery, useProfileQuery } from "src/services/user";
import { useTabsContext } from "src/contexts/tabs";
import ViewUser from "src/components/User/View";
import { useRouter } from "next/router";
import { SecurityProvider } from "src/contexts/security";

const User: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data: users } = useAllUsersQuery();
    const { pushTab } = useTabsContext();

    // TODO: remove
    const user = useMemo(
        () => users?.find((u) => u.id === +userId!) || null,
        [users, userId]
    );

    useEffect(() => {
        if (user) {
            pushTab({
                path: `/user/${userId}`,
                id: `user-${userId}`,
                label: `${user.firstName} ${user.lastName}`,
            });
        }
    }, [user]);

    return (
        <Grid container spacing={1} mt={1}>
            <Grid item xs={3.5} />
            <Grid item xs={5} order={"row"}>
                {user && <ViewUser user={user} />}
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    );
};

User.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default User;
