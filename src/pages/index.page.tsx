import { Box } from "@mui/material";

import type { NextPage } from "next";
import Head from "next/head";
import { AuthGuard } from "../components/authentication/auth-guard";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import ViewAll from "./components/ViewAll";

import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTabs } from "src/slices/tabs";

const Home: NextPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const tabs = useSelector(selectTabs);

  return (
    <>
      <Head>
        <title>Estate</title>
      </Head>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          pt: 2,
          pb: 8,
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
