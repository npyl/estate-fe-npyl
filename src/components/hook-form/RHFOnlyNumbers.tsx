import { FC } from "preact/compat";
import OnlyNumbersInput, { OnlyNumbersInputProps } from "../OnlyNumbers";
import { Controller, useFormContext } from "react-hook-form";

type Props = OnlyNumbersInputProps & {
    name: string;
};

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
