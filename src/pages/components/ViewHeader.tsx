import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import Iconify from "src/components/iconify/Iconify";

import { SoftButton } from "src/components/SoftButton";

import { ReactNode, useState } from "react";

interface IViewHeaderProps {
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  resource?: string;
  children?: ReactNode;
}

const ViewHeader = (props: IViewHeaderProps) => {
  const { onDelete, onEdit, resource = "property", children } = props;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <Paper sx={{ borderBottom: 1, borderColor: "divider", paddingX: 3 }}>
      <Grid container direction={"row"}>
        <Grid item flex={1}>
          {children}
        </Grid>
        <Grid item sx={{ mt: 1, mb: 1 }}>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mr: 1 }}
            onClick={onEdit}
          >
            Edit
          </Button>

          <SoftButton
            color="error"
            onClick={() => {
              setDeleteDialogOpen(true);
            }}
            startIcon={<DeleteIcon />}
          >
            Delete
          </SoftButton>

          <Dialog
            fullWidth
            maxWidth="xs"
            open={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false);
            }}
            closeAfterTransition={true}
          >
            <DialogTitle>
              Delete {resource === "property" ? "Property" : "Customer"}
            </DialogTitle>
            <DialogContentText ml={3}>Are you sure?</DialogContentText>
            <DialogContent>
              <SoftButton
                color="error"
                sx={{ mr: 1 }}
                onClick={onDelete}
                startIcon={<Iconify icon={"eva:trash-2-outline"} />}
              >
                Yes
              </SoftButton>

              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setDeleteDialogOpen(false);
                }}
              >
                No
              </Button>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewHeader;
