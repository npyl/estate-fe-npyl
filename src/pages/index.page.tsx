import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";

import StyledMenu from "src/components/StyledMenu";

import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

import type { NextPage } from "next";
import Head from "next/head";
import { AuthGuard } from "../components/authentication/auth-guard";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";
import ViewAll from "./components/ViewAll";

import { useState } from "react";
import { useRouter } from "next/router";

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

  return (
    <>
      <Head>
        <title>Estate Kop</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Tabs</Typography>
              </Grid>
              <Grid item>
                <Button
                  id="create-menu-button"
                  aria-controls={open ? "create-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                >
                  <AddIcon />
                  Create
                </Button>

                <StyledMenu
                  id="create-menu"
                  MenuListProps={{
                    "aria-labelledby": "create-menu-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      router.push("/property/create");
                    }}
                    disableRipple
                  >
                    <HomeIcon />
                    Property
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      router.push("/user/create");
                    }}
                    disableRipple
                  >
                    Manager
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem
                    onClick={() => {
                      router.push("/customer/create");
                    }}
                    disableRipple
                  >
                    Owner
                  </MenuItem>
                </StyledMenu>
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
