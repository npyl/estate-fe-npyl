import OnlyNumbersInput, {
    OnlyNumbersInputProps,
} from "@/components/OnlyNumbers";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props extends Omit<OnlyNumbersInputProps, "value" | "onChange"> {
    name: string;
}

const RHFOnlyNumbers: FC<Props> = ({ name, ...other }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <OnlyNumbersInput
                    {...other}
                    {...field}
                    error={!!error}
                    helperText={error?.message || ""}
                />
            )}
        />
    );
};

export default RHFOnlyNumbers;
