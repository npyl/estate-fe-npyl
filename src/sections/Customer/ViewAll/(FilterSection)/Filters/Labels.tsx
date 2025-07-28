import {
    Checkbox,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { StyledInputLabel } from "@/components/Filters";
import { useFiltersContext, useLabels } from "../Context";

export default function FilterLabels() {
    const { t } = useTranslation();

    const { setLabels } = useFiltersContext();
    const labels = useLabels() || [];

    const { data } = useGetLabelsQuery();

    const labelOptions = useMemo(() => data?.customerLabels, [data]) || [];

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
        setLabels(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <FormControl
            sx={{
                minWidth: "220px",
            }}
        >
            <StyledInputLabel>{t("Labels")}</StyledInputLabel>
            <Select
                multiple
                value={labels}
                onChange={handleChange}
                renderValue={renderLabelNames}
                input={
                    <OutlinedInput
                        sx={{ maxHeight: "38px", textAlign: "center" }}
                        label="Ετικέτες"
                    />
                }
            >
                {labelOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        <Checkbox checked={labels.indexOf(option.id!) > -1} />
                        <Label color={option.color} name={option.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
