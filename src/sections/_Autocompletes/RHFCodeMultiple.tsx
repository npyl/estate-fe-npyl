import { Controller, useFormContext } from "react-hook-form";
import CodeAutocompleteMultiple, {
    CodeAutocompleteMultipleProps,
} from "@/sections/_Autocompletes/CodeMultiple";
import { FC } from "react";

interface RHFPropertyCodeMultiple
    extends Omit<CodeAutocompleteMultipleProps, "value"> {
    name: string;
}

const RHFPropertyCodeMultiple: FC<RHFPropertyCodeMultiple> = ({
    name,
    onChange: _onChange,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { ref, value, onChange, ...field },
                fieldState: { error },
            }) => (
                <CodeAutocompleteMultiple
                    ref={ref as any}
                    {...field}
                    idValue={value}
                    onChange={(e, ids, codes) => {
                        _onChange?.(e, ids, codes);
                        onChange(ids);
                    }}
                    error={Boolean(error)}
                    helperText={error?.message}
                    {...props}
                />
            )}
        />
    );
};

export default RHFPropertyCodeMultiple;
