import { Container } from "@mui/material";
import type { NextPage } from "next";
import ViewUser from "@/sections/User/View";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { SecurityProvider } from "src/contexts/security";
import { useGetUserQuery } from "src/services/user";
import AuthGuard from "@/components/authentication/auth-guard";

import { useAuth } from "@/hooks/use-auth";
import ProfilePusher from "@/sections/Profile/ProfilePusher";

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
            <SecurityProvider>
                <ProfilePusher />
                {page}
            </SecurityProvider>
        </DashboardLayout>
    </AuthGuard>
);

export default Profile;
