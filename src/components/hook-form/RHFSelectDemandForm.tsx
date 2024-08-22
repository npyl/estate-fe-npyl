import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import {
    useController,
    UseControllerProps,
    useFormContext,
} from "react-hook-form";
import { FC, useState, useEffect } from "react";

type RHFSelectDemandFormProps = UseControllerProps & {
    label: string;
    adornment?: string;
    options: number[];
    allowClear?: boolean;
    isForYearOfConstruction?: boolean;
};

const RHFSelectDemandForm: FC<RHFSelectDemandFormProps> = ({
    label,
    adornment,
    options,
    allowClear = false,
    isForYearOfConstruction,
    ...props
}) => {
    const { field } = useController(props);
    const { control, getValues, setValue } = useFormContext();
    const [inputValue, setInputValue] = useState<string>("");

    const formatNumber = (value: number | string) => {
        return isForYearOfConstruction
            ? value.toString()
            : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    useEffect(() => {
        setInputValue(field.value ? formatNumber(field.value) : "");
    }, [field.value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^\d]/g, "");
        const numberValue = parseFloat(value);
        if (!isNaN(numberValue)) {
            field.onChange(numberValue);
            setInputValue(formatNumber(value));
        } else {
            setInputValue(value);
        }
    };

    const handleAutocompleteChange = (event: any, newValue: string | null) => {
        if (newValue !== null) {
            const numberValue = parseFloat(newValue.replace(/[^\d]/g, ""));
            if (!isNaN(numberValue)) {
                field.onChange(numberValue);
                setInputValue(formatNumber(newValue));
            } else {
                setInputValue(newValue);
            }
        } else {
            setInputValue("");
        }
    };
    //check the min input value to be less than max value and opossite
    const handleChangeWithValidation = (value: string) => {
        const numberValue = parseFloat(value.replace(/[^\d]/g, ""));
        if (!isNaN(numberValue)) {
            const [minName, maxName] = field.name.includes("min")
                ? [field.name, field.name.replace("min", "max")]
                : [field.name.replace("max", "min"), field.name];

            const minValue = getValues(minName);
            const maxValue = getValues(maxName);

            if (field.name.includes("min") && numberValue > maxValue) {
                setValue(maxName, numberValue);
            } else if (field.name.includes("max") && numberValue < minValue) {
                setValue(minName, numberValue);
            }
            field.onChange(numberValue);
            setInputValue(formatNumber(value));
        } else {
            setInputValue(value);
        }
    };

    return (
        <Autocomplete
            freeSolo
            options={options.map((option) => formatNumber(option))}
            value={inputValue}
            onChange={handleAutocompleteChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                handleChangeWithValidation(newInputValue);
            }}
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
                    onChange={(event) =>
                        handleInputChange(
                            event as React.ChangeEvent<HTMLInputElement>
                        )
                    }
                />
            )}
        />
    );
};

export default RHFSelectDemandForm;
