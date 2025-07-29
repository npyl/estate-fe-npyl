import { Container } from "@mui/material";
import type { NextPage } from "next";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { useGetUserQuery } from "src/services/user";
import ViewUser from "@/sections/User/View";
import { useRouter } from "next/router";
import AdminGuard from "@/components/authentication/admin-guard";

const User: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data: user } = useGetUserQuery(+userId!);

    return (
        <Container maxWidth="md">
            {user ? <ViewUser user={user} /> : null}
        </Container>
    );
};

User.getLayout = (page) => (
    <DashboardLayout>
        <AdminGuard>{page}</AdminGuard>
    </DashboardLayout>
);

export default User;
