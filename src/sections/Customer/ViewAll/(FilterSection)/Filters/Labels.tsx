import { Checkbox, MenuItem } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Label from "@/components/Label/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { useFiltersContext, useLabels } from "../Context";
import Select, { SelectChangeEvent } from "@/components/Select";

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

    const handleChange = useCallback(
        (event: SelectChangeEvent<typeof labels>) => {
            const {
                target: { value },
            } = event;
            setLabels(value as number[]);
        },
        []
    );

    return (
        <Select
            multiple
            value={labels}
            label={t("Labels")}
            formControlProps={{ sx: { minWidth: "220px" } }}
            onChange={handleChange}
            renderValue={renderLabelNames}
        >
            {labelOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    <Checkbox checked={labels.indexOf(option.id!) > -1} />
                    <Label color={option.color} name={option.name} />
                </MenuItem>
            ))}
        </Select>
    );
}
