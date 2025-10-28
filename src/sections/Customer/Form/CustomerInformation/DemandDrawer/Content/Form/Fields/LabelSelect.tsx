import { Checkbox, MenuItem } from "@mui/material";
import { FC, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/Label";
import { useGetLabelsQuery } from "src/services/labels";
import { filterName } from "../util";
import RHFSelect from "@/components/hook-form/dynamic/RHFSelect";
import { ICustomerYup } from "@/sections/Customer/Form/types";

interface Props {
    index: number;
}

const LabelSelect: FC<Props> = ({ index }) => {
    const { t } = useTranslation();

    const name = filterName("labels", index);
    const labels = (useWatch<ICustomerYup>({ name }) as number[]) || [];

    const { data } = useGetLabelsQuery();
    const labelOptions = data?.propertyLabels || [];

    const nameForId = useCallback(
        (id: number) => labelOptions.find((option) => option.id === id)?.name,
        [labelOptions]
    );

    const renderValue = (selected: number[]) =>
        selected.map(nameForId).join(", ");

    return (
        <RHFSelect
            multiple
            fullWidth
            label={t("Labels")}
            name={name}
            renderValue={renderValue}
            defaultValue={[]}
        >
            {labelOptions.map(({ id, color, name }) => (
                <MenuItem key={id} value={id}>
                    <Checkbox checked={labels.indexOf(id!) > -1} />
                    <Label color={color} name={name} />
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

export default LabelSelect;
