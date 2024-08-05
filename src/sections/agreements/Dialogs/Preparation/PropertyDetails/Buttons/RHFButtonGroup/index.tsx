import { IAgreementType } from "@/types/agreements";
import { Controller, useFormContext } from "react-hook-form";
import TranslatedCardLabel from "./TranslatedCardLabel";
import Stack from "@mui/material/Stack";
import ButtonGroup from "./ButtonGroup";
import FormHelperText from "@mui/material/FormHelperText";

const RHFButtonGroup = () => {
    const { control, watch, setValue } = useFormContext();

    const variant = watch("variant") as IAgreementType;

    return (
        <Controller
            name="variant"
            control={control}
            render={({ fieldState: { error } }) => (
                <>
                    {variant === "PURCHASE" ? (
                        <TranslatedCardLabel variant={variant} name={variant} />
                    ) : null}

                    {variant !== "PURCHASE" ? (
                        <Stack spacing={1}>
                            <ButtonGroup
                                variant={variant}
                                setValue={setValue}
                            />

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
