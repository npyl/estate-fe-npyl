// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Rating, RatingProps } from "@mui/material";

// ----------------------------------------------------------------------

type Props = RatingProps & {
    name: string;
};

export default function RHFRating({ name, ...other }: Props) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Rating
                    {...field}
                    value={parseInt(field.value) || 0} // Convert to number, default to 0 if NaN
                    // error={!!error}
                    // helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}
