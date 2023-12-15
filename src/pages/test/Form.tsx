import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { SliderPicker } from "react-color";
import { useTranslation } from "react-i18next";
import { LabelResourceType } from "src/types/label";
import { Label } from "src/components/label";
import ResourceSelect from "./ResourceSelect";

const Form = () => {
    const { t } = useTranslation();

    const [resource, setResource] = useState<LabelResourceType>("property");

    const [name, setName] = useState("");
    const [color, setColor] = useState("");

    const [error, setError] = useState("");
    const [autocompleteError, setAutocompleteError] = useState("");

    return (
        <Paper
            sx={{
                width: "30%",
                height: "500px",
                p: 3,
            }}
        >
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                {t("Create Label")}
            </Typography>
            <ResourceSelect resource={resource} setResource={setResource} />

            <Box
                mt={5}
                px={5}
                gap={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    value={name}
                    placeholder={t("Label's name").toString()}
                    error={!!error}
                    helperText={error}
                    onChange={(event) => setName(event.target.value)}
                />

                <SliderPicker
                    color={color}
                    onChangeComplete={(c) => setColor(c.hex)}
                />

                <Box my={2}>
                    <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                        {t("Preview")}
                    </Typography>
                    <Label
                        variant="soft"
                        sx={{
                            bgcolor: color,
                            borderRadius: "7px",
                            color: "white",
                            display: "block",
                            textAlign: "center",
                            padding: "4px 8px",
                        }}
                    >
                        {name || t("New Label")}
                    </Label>
                </Box>
            </Box>
        </Paper>
    );
};

export default Form;
