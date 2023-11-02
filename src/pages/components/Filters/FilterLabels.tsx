import {
    Checkbox,
    FormControl,
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
import { useTranslation } from "react-i18next";

import StyledInputLabel from "./components/StyledInputLabel";

type FilterVariant = "property" | "customer";

interface FilterLabelsProps {
    variant: FilterVariant;
    labels: number[];
    setLabels: ActionCreatorWithPayload<any, string>;
}

export default function FilterLabels(props: FilterLabelsProps) {
    const { variant = "property", labels, setLabels } = props;
    const { t } = useTranslation();
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
    const renderLabelNames = (selectedIds: number[]) => {
        return selectedIds
            .map((id) => {
                const labelOption = labelOptions.find(
                    (option) => option.id === id
                );
                return labelOption ? labelOption.name : "Unknown";
            })
            .join(", ");
    };

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
        <FormControl sx={{ minWidth: "130px", maxHeight: "38px" }}>
            <StyledInputLabel sx={{}} id="demo-simple-select-label">
                {t("Labels")}
            </StyledInputLabel>
            <Select
                multiple
                labelId="demo-simple-select-label"
                value={labels}
                onChange={handleChange}
                renderValue={(selected) =>
                    renderLabelNames(selected as number[])
                }
                input={
                    <OutlinedInput
                        sx={{ maxHeight: "38px", textAlign: "center" }}
                        label="Ετικέτες"
                    />
                }
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
