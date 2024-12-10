import { Container } from "@mui/material";
import type { NextPage } from "next";
import { useEffect } from "react";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { useGetUserQuery } from "src/services/user";
import { useTabsContext } from "src/contexts/tabs";
import ViewUser from "@/sections/User/View";
import { useRouter } from "next/router";
import { SecurityProvider } from "src/contexts/security";
import { AdminGuard } from "src/components/authentication/admin-guard";

const User: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data: user } = useGetUserQuery(+userId!);
    const { pushTab } = useTabsContext();

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
    <DashboardLayout>
        <AdminGuard>
            <SecurityProvider>{page}</SecurityProvider>
        </AdminGuard>
    </DashboardLayout>
);

export default User;
