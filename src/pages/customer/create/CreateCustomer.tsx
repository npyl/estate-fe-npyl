import type { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { resetState, selectAll } from "src/slices/customer";
import { selectAll as selectAllNewLabels } from "src/slices/labels";

import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useAddCustomerMutation } from "src/services/customers";
import { useCreateLabelForCustomerMutation } from "src/services/labels";
import AddressDetails from "../components/AddressDetails";
import CustomerInformation from "../components/CustomerInformation";
import DemandForm from "../components/DemandForm";
import MatchingSystem from "../components/MatchingSystem";
import NonPriorityFeatures from "../components/NonPriorityFeatures";
import NotesSection from "../components/NotesSection";
import PriorityFeatures from "../components/PriorityFeatures";

const CreateCustomer: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [create, { isSuccess, data: createdCustomer }] =
    useAddCustomerMutation();
  const [createLabel, { isSuccess: isLabelSuccess }] =
    useCreateLabelForCustomerMutation();

  const body = useSelector(selectAll);
  const newLabels = useSelector(selectAllNewLabels);

  const createAndAssignNewLabels = () => {
    const createdCustomerId = createdCustomer!.id;

    // foreach label; call create-for-customer-with-id
    newLabels.forEach((newLabel) => {
      createLabel({
        customerId: createdCustomerId,
        labelBody: newLabel,
      });
    });

    router.push("/customer");
  };

  const performUpload = () => {
    create(body);
  };

  isSuccess && createdCustomer && createAndAssignNewLabels();

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
                onClick={() => dispatch(resetState())}
              >
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => performUpload()}
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
