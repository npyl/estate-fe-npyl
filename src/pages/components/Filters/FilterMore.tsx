import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Iconify from "src/components/iconify";
import sumOfChangedProperties from "src/slices/filters";
import TagFiltered from "./TagFiltered";

// ----------------------------------------------------------------------

export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onOpen: VoidFunction;
  onApply: VoidFunction;
  onClose: VoidFunction;
  onResetFilter: VoidFunction;
};

export default function FilterMore({
  open,
  onApply,
  onClose,
  onResetFilter,
}: Props) {
  const changedPropsCount = useSelector(sumOfChangedProperties);
  return (
    <Dialog open={open} onClose={onClose} scroll={"paper"}>
      <DialogTitle>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Chip label={changedPropsCount} color={"error"} />
          <Typography variant="subtitle1">Φίλτρα</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <TagFiltered />
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button color={"secondary"} onClick={onResetFilter}>
          Εκκαθάριση όλων
        </Button>

        <Button
          color={"secondary"}
          variant="outlined"
          onClick={() => {
            onApply();
            onClose();
          }}
        >
          Εφαρμογή
        </Button>
      </DialogActions>
    </Dialog>
  );
}
