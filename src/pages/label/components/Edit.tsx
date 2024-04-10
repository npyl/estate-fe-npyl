import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { SliderPicker } from "react-color";
import { Label } from "@/components/Label";
import { IEditProps } from "./types";
import { useTranslation } from "react-i18next";

interface EditProps {
    editedLabel: IEditProps;
    cancelEdit: () => void;
    editLabel: (editedLabel: IEditProps) => void;
}

export const Edit = ({ editedLabel, cancelEdit, editLabel }: EditProps) => {
    const { t } = useTranslation();

    const [pickerColor, setPickerColor] = useState(editedLabel.color);
    const [labelName, setLabelName] = useState(editedLabel.name);

    const [error, setError] = useState("");

    const handleChangeComplete = (color: any) => setPickerColor(color.hex);

    const handleCreateLabel = () => {
        if (!labelName) {
            setError(t("The name of the label is mandatory") || "");
            return;
        }

        editLabel({
            id: editedLabel.id,
            name: labelName,
            color: pickerColor,
            resource: editedLabel.resource,
        });
    };

    return (
        <Paper
            sx={{
                p: 3,
            }}
            elevation={3}
        >
            <Typography variant="h5" gutterBottom>
                {t("Edit Label")}
            </Typography>

            <FormControl fullWidth sx={{ marginTop: 3 }}>
                <TextField
                    fullWidth
                    label={t("Label's name")}
                    variant="outlined"
                    value={labelName}
                    placeholder="Label's Name"
                    error={!!error}
                    helperText={error}
                    onFocus={(event) => {
                        event.target.placeholder = "";
                        setError("");
                    }}
                    onBlur={(event) =>
                        (event.target.placeholder = "Label's Name")
                    }
                    onChange={(event) => setLabelName(event.target.value)}
                />

                <Box my={3}>
                    <SliderPicker
                        color={pickerColor}
                        onChangeComplete={handleChangeComplete}
                    />
                </Box>

                <Box mb={2}>
                    <FormLabel component="legend">
                        <Typography variant="subtitle2" color="textSecondary">
                            {t("Preview")}
                        </Typography>
                    </FormLabel>
                </Box>
                <Box mb={3}>
                    <Label
                        color={pickerColor}
                        sx={{
                            display: "inline-block",
                            padding: "4px 12px",
                        }}
                        name={labelName || t("New Label")}
                    />
                </Box>

                <Stack direction={"row"} spacing={2} justifyContent="center">
                    <Button
                        variant="outlined"
                        onClick={cancelEdit}
                        color="error"
                    >
                        {t("Cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateLabel}
                        color="primary"
                    >
                        {t("Save")}
                    </Button>
                </Stack>
            </FormControl>
        </Paper>
    );
};
