import { TextField, InputAdornment } from "@mui/material";
import { FC, useCallback } from "react";
import RHFAutocomplete from "@/components/hook-form/dynamic/RHFAutocomplete";

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
