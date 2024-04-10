import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { IDemandFiltersPOST } from "src/types/demand";

interface LabelSelectProps {
    onDemandFiltersName: (k: keyof IDemandFiltersPOST) => any;
}

export const LabelSelect: React.FC<LabelSelectProps> = ({
    onDemandFiltersName,
}) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();

    const labelsName = onDemandFiltersName("labels");
    const labels = (watch(labelsName) as number[]) || [];

    const { data } = useGetLabelsQuery();
    const labelOptions = data?.propertyLabels || [];

    const handleChange = useCallback(
        (event: SelectChangeEvent<number[]>) => {
            setValue(labelsName, event.target.value);
        },
        [labelsName]
    );

    const nameForId = (id: number) =>
        labelOptions.find((option) => option.id === id)?.name;

    const renderValue = (selected: number[]) =>
        selected.map((id) => nameForId(id)).join(", ");

    return (
        <FormControl fullWidth>
            <InputLabel>{t("Labels")}</InputLabel>
            <Select
                multiple
                value={labels}
                onChange={handleChange}
                renderValue={renderValue}
                input={<OutlinedInput />}
            >
                {labelOptions.map(({ id, color, name }) => (
                    <MenuItem key={id} value={id}>
                        <Checkbox checked={labels.indexOf(id!) > -1} />
                        <Label color={color} name={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
