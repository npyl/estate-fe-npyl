import { Grid, Button } from "@mui/material";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectParentCategory } from "src/slices/property";

import { resetState as resetLabelsState } from "src/slices/labels";
import { resetState as resetPropertyState } from "src/slices/property";
import { resetState as resetPropertyFilesState } from "src/slices/property/files";
import { resetState as resetPropertyNotesState } from "src/slices/notes";

import CommercialFormSection from "./components/CommercialForm";
import LandFormSection from "./components/LandForm";
import OtherFormSection from "./components/OtherForm";
import ResidentialFormSection from "./components/ResidentialForm";

import { Delete as DeleteIcon, Send as SendIcon } from "@mui/icons-material";

export default function Form({
  edit = false,
  performUpload,
}: {
  edit?: boolean;
  performUpload?: () => void;
}) {
  const dispatch = useDispatch();

  // enums
  const parentCategory = useSelector(selectParentCategory);

  const resetState = () => {
    dispatch(resetPropertyState());
    dispatch(resetPropertyFilesState());
    dispatch(resetPropertyNotesState());
    dispatch(resetLabelsState());
  };

  useEffect(() => {
    if (!edit) {
      resetState();
    }
  }, [edit]);

  const handleClick = () => {
    // create our property draft
    performUpload && performUpload();
  };

  return (
    <Grid container spacing={1} paddingLeft={2} paddingTop={3}>
      {parentCategory !== "" && (
        <Grid container mt={0} spacing={1}>
          {parentCategory === "Residential" && <ResidentialFormSection />}
          {parentCategory === "Land" && <LandFormSection />}
          {parentCategory === "Commercial" && <CommercialFormSection />}
          {parentCategory === "Other" && <OtherFormSection />}
        </Grid>
      )}

      <Grid
        padding={2}
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
  );
}
