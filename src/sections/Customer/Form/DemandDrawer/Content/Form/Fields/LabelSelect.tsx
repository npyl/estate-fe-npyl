import {
    Checkbox,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { FC, useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { filterName } from "../util";

interface Props {
    index: number;
}

const LabelSelect: FC<Props> = ({ index }) => {
    const { t } = useTranslation();
    const { setValue } = useFormContext();

    const labelsName = filterName("labels", index);
    const labels = (useWatch({ name: labelsName }) as number[]) || [];

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

export default LabelSelect;
