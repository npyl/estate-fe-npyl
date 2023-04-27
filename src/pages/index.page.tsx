
import { Box, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { AuthGuard } from "../components/authentication/auth-guard";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import ViewAll from "./components/ViewAll";

const Home: NextPage = () => {
 
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent='space-between' spacing={3}>
              <Grid item>
                <Typography variant='h4'>Tabs</Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
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
