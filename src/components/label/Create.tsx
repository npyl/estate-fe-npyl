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
import { Close as CloseIcon } from "@mui/icons-material";

import * as React from "react";
import { useEffect, useState } from "react";

import Label from "src/components/label/Label";

import { SliderPicker } from "react-color";

import { ILabel } from "src/types/label";
import { useTranslation } from "react-i18next";

interface ILabelCreateProps {
    variant?: string;

    existingLabels: ILabel[];
    // assigned-existing labels & newly-created labels
    assignedLabels: ILabel[];
    newLabels: ILabel[];

    // handlers
    onLabelClick: (label: ILabel) => void;
    onLabelCreate: (label: ILabel) => void;
    onRemoveAssignedLabel: (index: number) => void;
    onRemoveNewLabel: (index: number) => void;
}

const LabelCreate = ({
    variant = "property",
    existingLabels,
    assignedLabels,
    newLabels,
    onLabelClick,
    onLabelCreate,
    onRemoveAssignedLabel,
    onRemoveNewLabel,
}: ILabelCreateProps) => {
    const { t } = useTranslation();
    const [addLabelDialog, setAddLabelDialog] = useState(false);

    const [pickerColor, setPickerColor] = useState("#22194d");
    const [labelName, setLabelName] = useState("");

    const [error, setError] = useState("");

    const handleChangeComplete = (color: any) => {
        setPickerColor(color.hex);
    };
    const [unavailableLabels, setUnavailableLabels] = useState<string[]>([]);
    const handleLabelClick = (label: ILabel) => {
        onLabelClick(label); // Call the prop's handler
        setUnavailableLabels((prev) => [...prev, label.name]); // Add the clicked label's name to the unavailable list
    };
    const [dialogKey, setDialogKey] = useState(0);

    const createLabel = () => {
        setDialogKey((prevKey) => prevKey + 1);

        if (!labelName) {
            setError(t("The name of the label is mandatory") || "");
            return;
        }

        onLabelCreate({ color: pickerColor, name: labelName });

        // After creating a label, reset the states
        setPickerColor("#22194d");
        setLabelName("");
        setError("");

        // close dialog
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10px",
                }}
            >
                <Typography flex={1} sx={{ justifyContent: "center" }}>
                    {t("Labels")}
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => setAddLabelDialog(true)}
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>

            {((assignedLabels && assignedLabels.length > 0) ||
                (newLabels && newLabels.length > 0)) && (
                <Box
                    flex={1}
                    justifyContent={"center"}
                    flexWrap={"wrap"}
                    pt={2}
                >
                    <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
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
                    </Stack>
                    <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
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
                    </Stack>
                </Box>
            )}

            <Dialog
                key={dialogKey}
                fullWidth
                maxWidth="xs"
                open={addLabelDialog}
                onClose={() => setAddLabelDialog(false)}
                closeAfterTransition={true}
            >
                <DialogTitle variant="h5">
                    {t("Adding an existing label")}
                    <IconButton
                        aria-label="close"
                        onClick={() => setAddLabelDialog(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "grey",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {variant === "property"
                            ? "Property Labels"
                            : "Customer Labels"}
                    </DialogContentText>
                    <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                        {existingLabels.map((label, index) => {
                            const isAssigned = assignedLabels.some(
                                (assignedLabel) =>
                                    assignedLabel.name === label.name
                            );
                            return (
                                <Label
                                    key={index}
                                    variant="soft"
                                    onClick={
                                        isAssigned
                                            ? undefined
                                            : () => onLabelClick(label)
                                    }
                                    opacity={isAssigned ? 0.4 : 1} // Pass opacity directly here
                                    sx={{
                                        bgcolor: label.color,
                                        borderRadius: 7,
                                        color: "white",
                                        "&:hover": isAssigned
                                            ? undefined
                                            : { cursor: "pointer" },
                                    }}
                                >
                                    {label.name}
                                </Label>
                            );
                        })}
                    </Stack>

                    <Typography variant="h5">{t("Create Label")}</Typography>
                    <Stack spacing={3} mt={2}>
                        <Stack spacing={1}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group"></FormLabel>
                                <Stack direction={"row"} spacing={1}>
                                    <TextField
                                        fullWidth
                                        label={t("Label's name")}
                                        variant="outlined"
                                        value={labelName}
                                        placeholder="Label's Name"
                                        error={!!error}
                                        helperText={error}
                                        onFocus={(event) => {
                                            (event.target.placeholder = ""),
                                                setError("");
                                        }}
                                        onBlur={(event) =>
                                            (event.target.placeholder =
                                                t("New Label"))
                                        }
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setLabelName(event.target.value);
                                        }}
                                    />
                                </Stack>
                                <Box m={2}>
                                    <SliderPicker
                                        color={pickerColor}
                                        onChangeComplete={handleChangeComplete}
                                    />
                                </Box>
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
                                                {t("Preview")}
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
                                            {labelName || t("New Label")}
                                        </Label>
                                    </Stack>

                                    <Button
                                        variant="outlined"
                                        onClick={createLabel}
                                    >
                                        {t("Create")}
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
export default LabelCreate;
