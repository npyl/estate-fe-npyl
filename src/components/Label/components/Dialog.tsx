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

import { Close as CloseIcon } from "@mui/icons-material";
import * as React from "react";
import { useMemo, useState } from "react";
import { SliderPicker } from "react-color";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { ILabel, ILabelPOST, LabelResourceType } from "src/types/label";

interface AddLabelDialog {
    open: boolean;
    variant: LabelResourceType;

    existingLabels: ILabel[];
    assignedLabels: ILabel[];

    onLabelClick: (l: ILabel) => void;
    onCreate: (l: ILabelPOST) => void;
    onClose: () => void;
}

export const AddLabelDialog = ({
    open,
    variant,

    existingLabels,
    assignedLabels,

    onLabelClick,
    onCreate,
    onClose,
}: AddLabelDialog) => {
    const { t, i18n } = useTranslation();

    const [error, setError] = useState("");

    const [pickerColor, setPickerColor] = useState("#22194d");
    const [labelName, setLabelName] = useState("");

    const title = useMemo(
        () =>
            variant === "property"
                ? t("Property Labels")
                : variant === "customer"
                ? t("Customer Labels")
                : t("Document Labels"),
        [i18n.language]
    );

    const handleChangeComplete = (color: any) => setPickerColor(color.hex);

    const createLabel = () => {
        if (!labelName) {
            setError(t("The name of the label is mandatory") || "");
            return;
        }

        onCreate({ color: pickerColor, name: labelName });

        // After creating a label, reset the states
        setPickerColor("#22194d");
        setLabelName("");
        setError("");

        // close dialog
        onClose();
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            open={open}
            onClose={onClose}
            closeAfterTransition={true}
        >
            <DialogTitle variant="h5">
                {t("Add an existing label")}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
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
                <DialogContentText>{title}</DialogContentText>
                <Stack direction={"row"} flexWrap={"wrap"} gap={1} mt={1}>
                    {existingLabels.map((label, index) => {
                        const isAssigned = assignedLabels.some(
                            (assignedLabel) => assignedLabel.name === label.name
                        );

                        return (
                            <Label
                                key={index}
                                color={label.color}
                                name={label.name}
                                onClick={
                                    isAssigned
                                        ? undefined
                                        : () => onLabelClick(label)
                                }
                                opacity={isAssigned ? 0.4 : 1} // Pass opacity directly here
                                sx={{
                                    borderRadius: 7,
                                    "&:hover": isAssigned
                                        ? undefined
                                        : { cursor: "pointer" },
                                }}
                            />
                        );
                    })}
                </Stack>

                <Typography variant="h5" mt={2}>
                    {t("Create Label")}
                </Typography>
                <Stack spacing={3} mt={1}>
                    <Stack spacing={1}>
                        <FormControl>
                            <Stack direction="row" spacing={1}>
                                <TextField
                                    fullWidth
                                    label={t("Label's name")}
                                    variant="outlined"
                                    value={labelName}
                                    placeholder={t("Label's Name").toString()}
                                    // ...
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
                                    <FormLabel>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: "text.secondary",
                                            }}
                                        >
                                            {t("Preview")}
                                        </Typography>
                                    </FormLabel>
                                    <Label
                                        color={pickerColor}
                                        name={labelName || t("New Label")}
                                    />
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
    );
};
