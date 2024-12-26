import { Controller, useFormContext } from "react-hook-form";
import TranslatedCardLabel from "./TranslatedCardLabel";
import Stack from "@mui/material/Stack";
import ButtonGroup from "./ButtonGroup";
import FormHelperText from "@mui/material/FormHelperText";

const RHFButtonGroup = () => {
    const { control } = useFormContext();

    return (
        <Controller
            name="variant"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <>
                    {value === "PURCHASE" ? (
                        <TranslatedCardLabel variant={value} name={value} />
                    ) : null}

                    {value !== "PURCHASE" ? (
                        <Stack spacing={1}>
                            <ButtonGroup variant={value} setValue={onChange} />

                            {error ? (
                                <FormHelperText error>
                                    {error?.message}
                                </FormHelperText>
                            ) : null}
                        </Stack>
                    ) : null}
                </>
            )}
        />
    );
};

export default RHFButtonGroup;
