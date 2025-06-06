import { Container } from "@mui/material";
import type { NextPage } from "next";
import ViewUser from "@/sections/User/View";
import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { SecurityProvider } from "@/contexts/security";
import { useGetUserQuery } from "@/services/user";
import AuthGuard from "@/components/authentication/auth-guard";
import { useAuth } from "@/hooks/use-auth";

const Profile: NextPage = () => {
    const { user } = useAuth();
    const { data: profile } = useGetUserQuery(+user?.id!);

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
