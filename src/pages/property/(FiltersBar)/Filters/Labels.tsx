import {
    Checkbox,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { useDispatch } from "src/store";
import { StyledInputLabel } from "@/components/Filters";

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
        <FormControl
            sx={{
                minWidth: "130px",
                maxHeight: "38px",

                display: {
                    md: "none",
                    lg: "flex",
                },
            }}
        >
            <StyledInputLabel>{t("Labels")}</StyledInputLabel>
            <Select
                multiple
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
                            <Label color={option.color} name={option.name} />
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
