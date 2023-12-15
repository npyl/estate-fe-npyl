import { Box } from "@mui/material";
import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import Form from "./Form";
import Preview from "./Preview";

const Test: NextPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                py: 1,
                gap: 1,
            }}
        >
            <Form />
            <Preview />
        </Box>
    );
};

Test.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Test;
