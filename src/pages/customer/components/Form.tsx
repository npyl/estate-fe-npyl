import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Button, Grid, Stack } from "@mui/material";

import AddressDetails from "./AddressDetails";

import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { resetState as resetCustomerState } from "src/slices/customer";
import { resetState as resetNotesState } from "src/slices/notes";
import { resetState as resetLabelsState } from "src/slices/labels";

import CustomerInformation from "./CustomerInformation";
import DemandForm from "./DemandForm";
import MatchingSystem from "./MatchingSystem";
import NonPriorityFeatures from "./NonPriorityFeatures";
import NotesSection from "./NotesSection";
import PriorityFeatures from "./PriorityFeatures";

const Form = ({
  edit = false,
  performUpload,
}: {
  edit?: boolean;
  performUpload: () => void;
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    performUpload && performUpload();
  };

  const resetState = () => {
    dispatch(resetCustomerState());
    dispatch(resetLabelsState());
    dispatch(resetNotesState());
  };

  useEffect(() => {
    if (!edit) {
      resetState();
    }
  }, [edit]);

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
              onClick={() => resetState()}
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
              {edit ? "Save" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Form;
