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
                    value={
                        typeof field.value === "number" && field.value === 0
                            ? ""
                            : field.value
                    }
                    // error={!!error}
                    // helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}
