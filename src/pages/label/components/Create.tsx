import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAllPropertiesQuery } from "src/services/properties";
import { useAllCustomersQuery } from "src/services/customers";
import { SliderPicker } from "react-color";
import { Label } from "src/components/label";

export const Create = (props: {
    createLabel: (
        labelName: string,
        autocompleteValue: string,
        pickerColor: string,
        assigneeType: string
    ) => void;
}) => {
    const { createLabel } = props;

    const [assigneeType, setAssigneeType] = useState("");
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

    const handleChangeComplete = (color: any) => {
        setPickerColor(color.hex);
    };
    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const handleAssigneeTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAutocompleteValue(""); // clear
        setAssigneeType((event.target as HTMLInputElement).value);
    };
    const autocompleteChange = (_event: any, value: string | null) => {
        if (!value) return;
        setAutocompleteValue(value);
    };

    const handleCreateLabel = () => {
        if (!labelName) {
            setError("Το όνομα της ετικέτας είναι υποχρεωτικό");
            return;
        }
        if (checked && !autocompleteValue) {
            setAutocompleteError("Το code είναι υποχρεωτικό");
            return;
        }

        createLabel(labelName, autocompleteValue, pickerColor, assigneeType);
    };

    return (
        <>
            <Grid component={Paper} item xs={12} sm={4} p={2}>
                <Typography variant="h5">Δημιουργία νέας</Typography>
                <Stack spacing={3} mt={2}>
                    <Stack spacing={1}>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">
                                <Typography
                                    variant="subtitle2"
                                    sx={{ color: "text.secondary" }}
                                >
                                    Επιλέξτε ετικέτα για:
                                </Typography>
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={assigneeType}
                                onChange={handleAssigneeTypeChange}
                            >
                                <FormControlLabel
                                    value="property"
                                    control={<Radio />}
                                    label="Ακίνητο"
                                />
                                <FormControlLabel
                                    value="customer"
                                    control={<Radio />}
                                    label="Πελάτης"
                                />
                            </RadioGroup>
                        </FormControl>
                        {assigneeType && (
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
                                        placeholder="Νέα Ετικέτα"
                                        error={!!error}
                                        helperText={error}
                                        onFocus={(event) => {
                                            (event.target.placeholder = ""),
                                                setError("");
                                        }}
                                        onBlur={(event) =>
                                            (event.target.placeholder =
                                                "Νέα Ετικέτα")
                                        }
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setLabelName(event.target.value);
                                        }}
                                    />
                                </Stack>
                                <Box m={4}>
                                    <SliderPicker
                                        color={pickerColor}
                                        onChangeComplete={handleChangeComplete}
                                    />
                                </Box>
                                <FormControl>
                                    <Stack
                                        direction={"row"}
                                        paddingTop={2}
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
                                            {labelName || "Νέα Ετικέτα"}
                                        </Label>
                                    </Stack>
                                    <Stack
                                        paddingTop={1}
                                        direction={"row"}
                                        alignItems={"center"}
                                    >
                                        <FormLabel id="demo-controlled-radio-buttons-group">
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                Επιθυμείτε ανάθεση τώρα;
                                            </Typography>
                                        </FormLabel>
                                        <Checkbox
                                            checked={checked}
                                            onChange={handleCheck}
                                            inputProps={{
                                                "aria-label": "controlled",
                                            }}
                                        />
                                    </Stack>
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
                                            sx={{
                                                width: "50%",
                                                marginBottom: 2,
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    error={!!autocompleteError}
                                                    helperText={
                                                        autocompleteError
                                                    }
                                                    onFocus={(event) =>
                                                        setAutocompleteError("")
                                                    }
                                                    {...params}
                                                />
                                            )}
                                        />
                                    )}
                                    <Button
                                        variant="outlined"
                                        onClick={handleCreateLabel}
                                    >
                                        Δημιουργία
                                    </Button>
                                </FormControl>
                            </FormControl>
                        )}
                    </Stack>
                </Stack>
            </Grid>
        </>
    );
};
