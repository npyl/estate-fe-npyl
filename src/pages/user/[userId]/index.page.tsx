import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useAllUsersQuery } from "src/services/user";
import { useTabsContext } from "src/contexts/tabs";
import ViewUser from "src/components/User/View";
import { useRouter } from "next/router";
import { SecurityProvider } from "src/contexts/security";
import { AdminGuard } from "src/components/authentication/admin-guard";

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
        <Container maxWidth="md">
            {user ? <ViewUser user={user} /> : null}
        </Container>
    );
};

User.getLayout = (page) => (
    <AdminGuard>
        <DashboardLayout>
            <SecurityProvider>{page}</SecurityProvider>
        </DashboardLayout>
    </AdminGuard>
);

export default User;
