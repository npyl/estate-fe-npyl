import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useDispatch } from "src/store";
import Label from "src/components/label/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { useMemo } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type FilterVariant = "property" | "customer";

interface FilterLabelsProps {
    variant: FilterVariant;
    labels: number[];
    setLabels: ActionCreatorWithPayload<any, string>;
}

export default function FilterLabels(props: FilterLabelsProps) {
    const { variant = "property", labels, setLabels } = props;

    const dispatch = useDispatch();

    const { data } = useGetLabelsQuery();
    const labelOptions =
        useMemo(
            () =>
                variant === "property"
                    ? data?.propertyLabels
                    : data?.customerLabels,
            [data]
        ) || [];

    const handleChange = (event: SelectChangeEvent<typeof labels>) => {
        const {
            target: { value },
        } = event;
        dispatch(
            setLabels(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            )
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Labels</InputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={labels}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                input={<OutlinedInput label="Ετικέτες" />}
                MenuProps={{ PaperProps: { sx: { maxHeight: "60vh" } } }}
            >
                {labelOptions.map((option) => {
                    return (
                        <MenuItem key={option.id} value={option.id}>
                            <Checkbox
                                checked={labels.indexOf(option.id!) > -1}
                            />
                            <Label
                                variant="soft"
                                sx={{
                                    bgcolor: option.color,
                                    borderRadius: 7,
                                    color: "white",
                                }}
                            >
                                {option.name}
                            </Label>
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
