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
import { Label } from "@/components/Label";
import { IEditProps } from "./Preview/types";
import { useTranslation } from "react-i18next";
import { useCreateLabelForResourceMutation } from "@/services/labels";
import ColorPicker from "@/components/ColorPicker";

const useEditLabel = () => {
    const [createLabelForResource] = useCreateLabelForResourceMutation();

    const editLabel = ({ id, name, color, resource }: IEditProps) => {
        return createLabelForResource({
            resource,
            body: {
                id,
                name,
                color,
            },
        });
    };

    return { editLabel };
};

interface EditProps {
    editedLabel: IEditProps;
    cancelEdit: () => void;
}

const Edit = ({ editedLabel, cancelEdit }: EditProps) => {
    const { t } = useTranslation();

    const [pickerColor, setPickerColor] = useState(editedLabel.color);
    const [labelName, setLabelName] = useState(editedLabel.name);

    const [error, setError] = useState("");

    const { editLabel } = useEditLabel();

    const handleCreateLabel = async () => {
        if (!labelName) {
            setError(t("The name of the label is mandatory") || "");
            return;
        }

        await editLabel({
            id: editedLabel.id,
            name: labelName,
            color: pickerColor,
            resource: editedLabel.resource,
        });

        cancelEdit();
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
                    <ColorPicker
                        color={pickerColor}
                        onColorChange={setPickerColor}
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

export default Edit;
