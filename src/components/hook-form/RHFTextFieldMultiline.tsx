import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormHelperText, TextFieldProps } from "@mui/material";
import MultilineTextField from "@/components/MultilineTextField";

interface Props extends Omit<TextFieldProps, "name"> {
    name: string;
}

const RHFMultilineTextField = ({ name, ...props }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Stack spacing={1}>
                    <MultilineTextField {...field} {...props} />

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default RHFMultilineTextField;
