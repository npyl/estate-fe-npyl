// form
// @mui
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
// config
// components

// ----------------------------------------------------------------------

export const FILTER_GENDER_OPTIONS = [
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
  { label: "Kids", value: "Kids" },
];

export const FILTER_CATEGORY_OPTIONS = [
  { label: "All", value: "All" },
  { label: "Shose", value: "Shose" },
  { label: "Apparel", value: "Apparel" },
  { label: "Accessories", value: "Accessories" },
];

export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];

// ----------------------------------------------------------------------

const onSelected = (selected: string[], item: string) =>
  selected.includes(item)
    ? selected.filter((value) => value !== item)
    : [...selected, item];

type Props = {
  open: boolean;
  isDefault: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  onResetFilter: VoidFunction;
};

export default function FilterMore({
  open,
  onOpen,
  onClose,
  isDefault,
  onResetFilter,
}: Props) {
  const changedPropsCount = useSelector(sumOfChangedProperties);
  return (
    <Dialog open={open} onClose={onClose} scroll={"paper"}>
      <DialogTitle>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Chip label={changedPropsCount} color={"error"} />
          <Typography variant='subtitle1'>Φίλτρα</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon='eva:close-fill' />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between" }}>
        <Button color={"secondary"} onClick={onClose}>
          Εκκαθάριση όλων
        </Button>

        <Button color={"secondary"} variant='outlined' onClick={onClose}>
          Εφαρμογή
        </Button>
      </DialogActions>
    </Dialog>
  );
}
