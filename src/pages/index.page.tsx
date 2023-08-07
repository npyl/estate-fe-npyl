import { Box } from "@mui/material";

import type { NextPage } from "next";
import { AuthGuard } from "../components/authentication/auth-guard";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import ViewAll from "./components/ViewAll";
import { usePublishTab } from "src/components/Tabs/utils";

const Home: NextPage = () => {
    usePublishTab({ title: "Properties", path: "/" });

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 2,
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
