import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ColorizeIcon from "@mui/icons-material/Colorize";

import * as React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useGetLabelsQuery } from "src/services/labels";

import Label from "src/components/label/Label";

import { BlockPicker } from "react-color";

// Customer Slice
import { addLabel, selectLabels } from "src/slices/customer";
// Labels Slice
import {
  addLabel as addNewLabel,
  selectAll as selectAllNewLabels,
} from "src/slices/labels";

import { ILabel } from "src/types/label";

const CreateLabel: React.FC<any> = (props) => {
  const [addLabelDialog, setAddLabelDialog] = useState(false);

  const [pickerColor, setPickerColor] = useState("#22194d");
  const [labelName, setLabelName] = useState("Νέα Ετικέτα");
  const [openPicker, setOpenPicker] = useState(false);
  const { data: labels } = useGetLabelsQuery();
  const customerLabels = labels?.customerLabels;
  const buttonRef = useRef<HTMLButtonElement>(null);

  // assigned-existing labels & newly-created labels
  const assignedLabelIDs: number[] = useSelector(selectLabels);
  const newLabels = useSelector(selectAllNewLabels);

  const dispatch = useDispatch();

  const handleChangeComplete = (color: any) => {
    setPickerColor(color.hex);
  };
  const clickLabel = (label: ILabel) => {
    dispatch(addLabel(label.id));
  };

  const createLabel = () => {
    dispatch(addNewLabel({ color: pickerColor, name: labelName }));
  };

  if (!customerLabels) return null;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        height: "100%",
        px: 1.5,
        py: 1.5,
        display: "flex",
      }}
      flexDirection={"column"}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant='h6' flex={1}>
          Labels
        </Typography>
        <IconButton
          onClick={() => {
            setAddLabelDialog(true);
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {assignedLabelIDs &&
          assignedLabelIDs.length > 0 &&
          customerLabels &&
          customerLabels.length > 0 &&
          assignedLabelIDs.map((labelID, index) => {
            // get label object with id
            const label = labels.customerLabels.find(
              (label) => label.id === labelID
            );
            if (!label) return <></>;

            return (
              <Label
                key={index}
                variant='soft'
                sx={{
                  bgcolor: label.color,
                  borderRadius: 7,
                  color: "white",
                }}
              >
                {label.name}
              </Label>
            );
          })}
        {newLabels &&
          newLabels.length > 0 &&
          newLabels.map((label, index) => {
            return (
              <Label
                key={index}
                variant='soft'
                sx={{
                  bgcolor: label.color,
                  borderRadius: 7,
                  color: "white",
                }}
              >
                {label.name}
              </Label>
            );
          })}
      </Box>

      <Dialog
        fullWidth
        maxWidth='xs'
        open={addLabelDialog}
        onClose={() => {
          setAddLabelDialog(false);
        }}
        closeAfterTransition={true}
      >
        <DialogTitle variant='h5'>Προσθήκη Υπάρχουσας</DialogTitle>
        <DialogContent>
          <DialogContentText>Customer Labels</DialogContentText>
          <Stack direction={"row"} spacing={1}>
            {labels?.customerLabels.map((label, index) => {
              return (
                <Label
                  key={index}
                  variant='soft'
                  onClick={() => clickLabel(label)}
                  sx={{
                    bgcolor: label.color,
                    borderRadius: 7,
                    color: "white",
                    "&:hover": { cursor: "pointer" },
                  }}
                >
                  {label.name}
                </Label>
              );
            })}
          </Stack>

          <Typography variant='h5'>Δημιουργία νέας</Typography>
          <Stack spacing={3} mt={2}>
            <Stack spacing={1}>
              <FormControl>
                <FormLabel id='demo-controlled-radio-buttons-group'>
                  <Typography
                    variant='subtitle2'
                    sx={{ color: "text.secondary" }}
                  >
                    Εισάγετε όνομα:
                  </Typography>
                </FormLabel>
                <Stack direction={"row"} spacing={1}>
                  <TextField
                    id='outlined-select-currency'
                    value={labelName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLabelName(event.target.value);
                    }}
                  />

                  <Button
                    variant='outlined'
                    onClick={() => {
                      setOpenPicker(!openPicker);
                    }}
                    ref={buttonRef}
                  >
                    <ColorizeIcon />
                  </Button>

                  {openPicker && buttonRef.current && (
                    <Box
                      style={{
                        position: "absolute",
                        left: buttonRef.current.offsetLeft - 60,
                        top:
                          buttonRef.current.offsetTop +
                          buttonRef.current.offsetHeight +
                          10,
                        zIndex: 999,
                      }}
                    >
                      <BlockPicker
                        color={pickerColor}
                        onChangeComplete={handleChangeComplete}
                      />
                    </Box>
                  )}
                </Stack>
                <FormControl>
                  <Stack
                    direction={"row"}
                    paddingTop={2}
                    paddingBottom={2}
                    spacing={3}
                  >
                    <FormLabel id='demo-controlled-radio-buttons-group'>
                      <Typography
                        variant='subtitle2'
                        sx={{ color: "text.secondary" }}
                      >
                        Προεπισκόπιση:
                      </Typography>
                    </FormLabel>
                    <Label
                      variant='soft'
                      sx={{
                        bgcolor: pickerColor,
                        borderRadius: 7,
                        color: "white",
                      }}
                    >
                      {labelName}
                    </Label>
                  </Stack>

                  <Button variant='outlined' onClick={createLabel}>
                    Δημιουργία & Προσθήκη
                  </Button>
                </FormControl>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
export default CreateLabel;
