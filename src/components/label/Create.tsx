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
import { Close as CloseIcon } from "@mui/icons-material";

import * as React from "react";
import { useRef, useState } from "react";

import Label from "src/components/label/Label";

import { BlockPicker } from "react-color";

import { ILabel } from "src/types/label";

interface ILabelCreateProps {
  existingLabels: ILabel[];
  // assigned-existing labels & newly-created labels
  assignedLabels: ILabel[];
  newLabels: ILabel[];

  // handlers
  onLabelClick: (label: ILabel) => void;
  onLabelCreate: (label: ILabel) => void;
  onRemoveAssignedLabel: (index: number) => void,
  onRemoveNewLabel: (index: number) => void,
}

const LabelCreate = (props: ILabelCreateProps) => {
  const {
    existingLabels,
    assignedLabels,
    newLabels,
    onLabelClick,
    onLabelCreate,
    onRemoveAssignedLabel,
    onRemoveNewLabel,
  } = props;

  const [addLabelDialog, setAddLabelDialog] = useState(false);

  const [pickerColor, setPickerColor] = useState("#22194d");
  const [labelName, setLabelName] = useState("Νέα Ετικέτα");
  const [openPicker, setOpenPicker] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleChangeComplete = (color: any) => {
    setPickerColor(color.hex);
  };

  const clickLabel = (label: ILabel) => {
    onLabelClick(label);
  };
  const createLabel = () => {
    onLabelCreate({ color: pickerColor, name: labelName });

    /* close dialog */
    setAddLabelDialog(false);
  };

  if (!existingLabels) return null;

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
      <Box sx={{ display: "flex", justifyContent: "center", height: "10px" }}>
        <Typography flex={1} sx={{ justifyContent: "center" }}>
          Labels
        </Typography>
        <IconButton
          onClick={() => setAddLabelDialog(true)}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: 'wrap' }}>
        {assignedLabels.map((label, index) => {
          if (!label) return <></>;

          return (
            <Label
              key={index}
              variant="soft"
              sx={{
                bgcolor: label.color,
                color: "white",
              }}
              onClose={() => onRemoveAssignedLabel(index)}
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
                variant="soft"
                sx={{
                  bgcolor: label.color,
                  color: "white",
                }}
                onClose={() => onRemoveNewLabel(index)}
              >
                {label.name}
              </Label>
            );
          })}
      </Box>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={addLabelDialog}
        onClose={() => setAddLabelDialog(false)}
        closeAfterTransition={true}
      >
        <DialogTitle variant="h5">
          Προσθήκη Υπάρχουσας

          <IconButton
            aria-label="close"
            onClick={() => setAddLabelDialog(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'grey',
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Customer Labels</DialogContentText>
          <Stack direction={"row"} spacing={1}>
            {existingLabels.map((label, index) => {
              return (
                <Label
                  key={index}
                  variant="soft"
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

          <Typography variant="h5">Δημιουργία νέας</Typography>
          <Stack spacing={3} mt={2}>
            <Stack spacing={1}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    Εισάγετε όνομα:
                  </Typography>
                </FormLabel>
                <Stack direction={"row"} spacing={1}>
                  <TextField
                    id="outlined-select-currency"
                    value={labelName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setLabelName(event.target.value);
                    }}
                  />

                  <Button
                    variant="outlined"
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
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "text.secondary" }}
                      >
                        Προεπισκόπιση:
                      </Typography>
                    </FormLabel>
                    <Label
                      variant="soft"
                      sx={{
                        bgcolor: pickerColor,
                        borderRadius: 7,
                        color: "white",
                      }}
                    >
                      {labelName}
                    </Label>
                  </Stack>

                  <Button variant="outlined" onClick={createLabel}>
                    Δημιουργία & Προσθήκη
                  </Button>
                </FormControl>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box >
  );
};
export default LabelCreate;
