import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import { Grid, Button, Stack } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import CustomerInformation from "./components/CustomerInformation";
import AddressDetails from "./components/AddressDetails";
import NotesSection from "./components/NotesSection";
import DemandForm from "./components/DemandForm";
import PriorityFeatures from "./components/PriorityFeatures";
import NonPriorityFeatures from "./components/NonPriorityFeatures";
import MatchingSystem from "./components/MatchingSystem";

const CreateCustomer: NextPage = () => {
  return (
    <>
      <Grid paddingTop={1} paddingRight={0} spacing={1}>
        <Grid container paddingTop={1} paddingRight={1} spacing={1}>
          <Grid item xs={6} spacing={1} order={"row"}>
            <Stack spacing={1}>
              <CustomerInformation />
              <AddressDetails />
              <NotesSection />
            </Stack>
          </Grid>
          <Grid item xs={6} spacing={1}>
            <Stack spacing={1}>
              <DemandForm />
              <PriorityFeatures />
              <NonPriorityFeatures />
              <MatchingSystem />
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={12} padding={2}>
          <Grid
            container
            alignItems="center"
            justifyContent="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                // onClick={() => dispatch(resetState())}
              >
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                // onClick={() => performUpload()}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

CreateCustomer.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default CreateCustomer;
