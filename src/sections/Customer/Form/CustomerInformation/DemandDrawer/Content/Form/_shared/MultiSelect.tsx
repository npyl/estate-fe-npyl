import { Checkbox, MenuItem } from "@mui/material";
import { useCallback } from "react";
import { KeyValue } from "src/types/KeyValue";
import { Path, useWatch } from "react-hook-form";
import RHFSelect from "@/components/hook-form/dynamic/RHFSelect";
import { ICustomerYup } from "@/sections/Customer/Form/types";

interface MultiSelectProps {
    name: Path<ICustomerYup>;
    label: string;
    options: KeyValue[];
}

const MultiSelect = ({ name, label, options }: MultiSelectProps) => {
    const values = (useWatch<ICustomerYup>({ name }) as string[]) || [];

    const renderValue = useCallback(
        (selected: string[]) =>
            selected
                .map((key) => options.find((item) => item.key === key)?.value)
                .filter(Boolean)
                .join(", "),
        [options]
    );

    return (
        <RHFSelect
            multiple
            fullWidth
            name={name}
            label={label}
            defaultValue={[]}
            renderValue={renderValue}
        >
            {options.map(({ key, value }) => (
                <MenuItem key={key} value={key}>
                    <Checkbox checked={values?.indexOf(key) > -1} />
                    {value}
                </MenuItem>
            ))}
        </RHFSelect>
    );
};

export default MultiSelect;
