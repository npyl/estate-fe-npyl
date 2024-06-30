import { Button, ButtonGroup as MuiButtonGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import { useTranslation } from "react-i18next";
import { IAgreementType } from "@/types/agreements";

type Option = { label: string; value: IAgreementType };

const OPTIONS: Option[] = [
    { label: "Basic", value: "basic" },
    { label: "Basic Exclusive", value: "basic_exclusive" },
    { label: "Purchase", value: "purchase" },
];

const getVariant = (b: boolean) => (b ? "contained" : "outlined");

const ButtonGroup = () => {
    const { t } = useTranslation();
    const { control, watch, setValue } = useFormContext();

    return (
        <Controller
            name="variant"
            control={control}
            render={({ fieldState: { error } }) => (
                <Stack spacing={1}>
                    <MuiButtonGroup>
                        {OPTIONS.map(({ label, value }) => (
                            <Button
                                key={value}
                                name="variant"
                                variant={getVariant(watch("variant") === value)}
                                onClick={() => setValue("variant", value)}
                            >
                                {t(label)}
                            </Button>
                        ))}
                    </MuiButtonGroup>

                    {error ? (
                        <FormHelperText error>{error?.message}</FormHelperText>
                    ) : null}
                </Stack>
            )}
        />
    );
};

export default ButtonGroup;
