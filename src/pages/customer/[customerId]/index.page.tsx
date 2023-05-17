import { Box, Paper } from "@mui/material";

import type { NextPage } from "next";

import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

const CustomerView: NextPage = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
        }}
      >
        <Paper sx={{ mt: 2 }}></Paper>
      </Box>
    </>
  );
};

CustomerView.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CustomerView;
