import { TextField, InputAdornment } from "@mui/material";
import { FC, useCallback } from "react";
import RHFAutocomplete from "@/components/hook-form/dynamic/RHFAutocomplete";

//check the min input value to be less than max value and opossite
// const handleChangeWithValidation = (value: string) => {
//     const numberValue = parseFloat(value.replace(/[^\d]/g, ""));
//     if (!isNaN(numberValue)) {
//         const [minName, maxName] = field.name.includes("min")
//             ? [field.name, field.name.replace("min", "max")]
//             : [field.name.replace("max", "min"), field.name];

//         const minValue = getValues(minName);
//         const maxValue = getValues(maxName);

//         if (field.name.includes("min") && numberValue > maxValue) {
//             setValue(maxName, numberValue);
//         } else if (field.name.includes("max") && numberValue < minValue) {
//             setValue(minName, numberValue);
//         }
//         field.onChange(numberValue);
//         setInputValue(formatNumber(value));
//     } else {
//         setInputValue(value);
//     }
// };

type OptionsAutocompleteProps = {
    name: string;
    label: string;
    adornment?: string;
    options: number[];
    isForYearOfConstruction?: boolean;
};

const OptionsAutocomplete: FC<OptionsAutocompleteProps> = ({
    name,
    label,
    adornment,
    options,
    isForYearOfConstruction,
}) => {
    const formatNumber = useCallback(
        (value: number | string) =>
            isForYearOfConstruction
                ? value.toString()
                : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        [isForYearOfConstruction]
    );

    return (
        <RHFAutocomplete
            name={name}
            freeSolo
            options={options}
            getOptionLabel={formatNumber as any}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: adornment ? (
                            <InputAdornment position="end">
                                {adornment}
                            </InputAdornment>
                        ) : null,
                    }}
                />
            )}
        />
    );
};

export default OptionsAutocomplete;
