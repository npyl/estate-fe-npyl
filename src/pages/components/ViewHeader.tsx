import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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
    <Paper sx={{ borderBottom: 1, borderColor: "divider", paddingX: 2 }}>
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
            maxWidth='xs'
            open={deleteDialogOpen}
            onClose={() => {
              setDeleteDialogOpen(false);
            }}
            closeAfterTransition={true}
          >
            <DialogTitle sx={{ textAlign: 'center' }}>
              <HighlightOffIcon sx={{ fontSize: '100px', stroke: "Window", strokeWidth: 1.5, color: 'error.main' }} />
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={400}>Are you sure?</Typography>
            </DialogContent>
            <DialogContentText ml={3} mr={3} sx={{ textAlign: 'center' }}>
              Do you really want to delete this record?
              <br />
              This process cannot be undone
            </DialogContentText>
            <DialogContent sx={{ textAlign: 'center' }}>
              <Button
                sx={{ mr: 1 }}
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setDeleteDialogOpen(false);
                }}
              >
                No
              </Button>

              <SoftButton
                color="error"
                onClick={onDelete}
              // startIcon={<Iconify icon={"eva:trash-2-outline"} />}
              >
                Yes
              </SoftButton>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ViewHeader;
