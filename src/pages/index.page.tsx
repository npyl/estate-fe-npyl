import { Box } from "@mui/material";

import type { NextPage } from "next";
import { AuthGuard } from "../components/authentication/auth-guard";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import ViewAll from "./components/ViewAll";

const Home: NextPage = () => {
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 1,
                }}
            >
                <ViewAll />
            </Box>
        </>
    );
};

Home.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Home;
