import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SliderPicker } from "react-color";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useAllCustomersQuery } from "src/services/customers";
import { useAllPropertiesQuery } from "src/services/properties";
import { LabelResourceType } from "src/types/label";

interface CreateProps {
    createLabel: (
        labelName: string,
        autocompleteValue: string,
        pickerColor: string,
        assigneeType: LabelResourceType
    ) => void;
}

export const Create = ({ createLabel }: CreateProps) => {
    const { t } = useTranslation();

    const [assigneeType, setAssigneeType] = useState<LabelResourceType>();
    const [checked, setChecked] = useState(false);

    const [pickerColor, setPickerColor] = useState("#22194d");

    const [labelName, setLabelName] = useState("");
    const [autocompleteValue, setAutocompleteValue] = useState("");

    const [error, setError] = useState("");
    const [autocompleteError, setAutocompleteError] = useState("");

    const properties: string[] =
        useAllPropertiesQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter((property) => property.code !== null)
                    .map((property) => {
                        return property.code;
                    }),
            }),
        }).data || [];

    const customers: string[] =
        useAllCustomersQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter(
                        (customer) =>
                            customer.id &&
                            customer.firstName &&
                            customer.lastName
                    )
                    .map((customer) => {
                        return customer.firstName + " " + customer.lastName;
                    }),
            }),
        }).data || [];

    const handleChangeComplete = (color: any) => setPickerColor(color.hex);
    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(event.target.checked);
    const handleAssigneeTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAutocompleteValue("");
        setAssigneeType(event.target.value as LabelResourceType);
    };
    const autocompleteChange = (_event: any, value: string | null) => {
        if (!value) return;
        setAutocompleteValue(value);
    };

    const handleCreateLabel = () => {
        if (!labelName) {
            setError(t("The name of the label is mandatory") || "");
            return;
        }
        if (checked && !autocompleteValue) {
            setAutocompleteError(t("The code field is mandatory") || "");
            return;
        }

        createLabel(labelName, autocompleteValue, pickerColor, assigneeType!);
    };

    return (
        <Paper
            sx={{
                p: 3,
            }}
            elevation={3}
        >
            <Typography variant="h5" gutterBottom>
                {t("Create Label")}
            </Typography>

            <FormControl component={Stack} spacing={2} fullWidth>
                <RadioGroup
                    row
                    value={assigneeType}
                    onChange={handleAssigneeTypeChange}
                >
                    <FormControlLabel
                        value="property"
                        control={<Radio />}
                        label={t("Property")}
                    />
                    <FormControlLabel
                        value="customer"
                        control={<Radio />}
                        label={t("Customer")}
                    />
                    <FormControlLabel
                        value="document"
                        control={<Radio />}
                        label={t("Document")}
                    />
                </RadioGroup>

                {assigneeType && (
                    <>
                        <TextField
                            fullWidth
                            label={t("Label's name")}
                            variant="outlined"
                            value={labelName}
                            placeholder="Label's Name"
                            error={!!error}
                            helperText={error}
                            onChange={(event) =>
                                setLabelName(event.target.value)
                            }
                        />

                        <SliderPicker
                            color={pickerColor}
                            onChangeComplete={handleChangeComplete}
                        />

                        <Box my={2}>
                            <Typography
                                variant="subtitle2"
                                sx={{ marginBottom: 1 }}
                            >
                                {t("Preview")}
                            </Typography>
                            <Label
                                color={pickerColor}
                                name={labelName || t("New Label")}
                            />
                        </Box>

                        {assigneeType !== "document" && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleCheck}
                                    />
                                }
                                label={t("Label assignment")}
                            />
                        )}

                        {checked && (
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={autocompleteValue}
                                onChange={autocompleteChange}
                                options={
                                    assigneeType === "property"
                                        ? properties
                                        : customers
                                }
                                sx={{ width: "100%", marginBottom: 2 }}
                                renderInput={(params) => (
                                    <TextField
                                        error={!!autocompleteError}
                                        helperText={autocompleteError}
                                        {...params}
                                    />
                                )}
                            />
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleCreateLabel}
                        >
                            {t("Create")}
                        </Button>
                    </>
                )}
            </FormControl>
        </Paper>
    );
};
