import { Fragment, useState } from "react";
import type { FC, SyntheticEvent } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface ConfirmationDialogProps {
  onClose?: () => void;
  onComplete?: () => void;
  open?: boolean;
  title?: string;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = (props) => {
  const { onClose, onComplete, title, open, ...other } = props;

  return (
    <Dialog fullWidth
maxWidth='sm'
onClose={onClose}
open={!!open}
{...other}>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Typography variant='h6'>{title}</Typography>
        <IconButton color='inherit'
onClick={onClose}>
          <ClearIcon fontSize='small' />
        </IconButton>
      </Box>
      <DialogContent>
        <Box sx={{ float: "right" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onComplete}>Confirm</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

ConfirmationDialog.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  onComplete: PropTypes.func,
  open: PropTypes.bool,
};
