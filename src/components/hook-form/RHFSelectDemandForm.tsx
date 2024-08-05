import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
import { FC, useState, useEffect } from "react";

type RHFSelectDemandFormProps = UseControllerProps & {
    label: string;
    adornment?: string;
    options: number[];
    allowClear?: boolean;
};

const RHFSelectDemandForm: FC<RHFSelectDemandFormProps> = ({
    label,
    adornment,
    options,
    allowClear = false,
    ...props
}) => {
    const { field } = useController(props);
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        setInputValue(field.value ? formatNumber(field.value) : "");
    }, [field.value]);

    const formatNumber = (value: number | string) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

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
            field.onChange(newValue);
            setInputValue(formatNumber(newValue));
        } else {
            setInputValue("");
        }
    };

    return (
        <Autocomplete
            freeSolo
            options={options.map((option) => formatNumber(option))}
            value={formatNumber(field.value ?? "")}
            onChange={handleAutocompleteChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                handleInputChange({
                    target: { value: newInputValue },
                } as React.ChangeEvent<HTMLInputElement>);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    onChange={handleInputChange}
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

export default RHFSelectDemandForm;
