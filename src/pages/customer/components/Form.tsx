import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";

import AddressDetails from "./AddressDetails";

import { useDispatch, useSelector } from "react-redux";

import { resetState, selectAll } from "src/slices/customer";

import CustomerInformation from "./CustomerInformation";
import DemandForm from "./DemandForm";
import MatchingSystem from "./MatchingSystem";
import NonPriorityFeatures from "./NonPriorityFeatures";
import NotesSection from "./NotesSection";
import PriorityFeatures from "./PriorityFeatures";
import { create } from "lodash";
import router from "next/router";
import { fileData } from "src/components/file-thumbnail";
import { useAddCustomerMutation } from "src/services/customers";

const Form = ({
  edit = false,
  performUpload,
}: {
  edit?: boolean;
  performUpload: () => void;
}) => {
  const [create, { isSuccess }] = useAddCustomerMutation();
  const dispatch = useDispatch();
  const body = useSelector(selectAll);
  const handleClick = () => {
    performUpload && performUpload();
  };
  isSuccess && router.push("/");

  return (
    <Grid paddingTop={1} paddingRight={0} container spacing={1}>
      <Grid container item paddingTop={1} paddingRight={1} spacing={1}>
        <Grid item xs={6} order={"row"}>
          <Stack spacing={1}>
            <CustomerInformation />
            <AddressDetails />
            <NotesSection />
          </Stack>
        </Grid>
        <Grid item xs={6}>
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
              onClick={handleClick}
            >
              {edit ? "Edit" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;
