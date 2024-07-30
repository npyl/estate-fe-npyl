import {
    Button,
    ButtonGroup as MuiButtonGroup,
    Typography,
} from "@mui/material";
import {
    Controller,
    FieldValues,
    useFormContext,
    UseFormSetValue,
} from "react-hook-form";
import Stack from "@mui/material/Stack";
import FormHelperText from "@mui/material/FormHelperText";
import { useTranslation } from "react-i18next";
import { IAgreementType } from "@/types/agreements";
import { CardLabel } from "@/components/Cards/AgreementCard/Labels";

type Option = { label: string; value: IAgreementType };

const OPTIONS: Option[] = [
    { label: "Basic", value: "BASIC" },
    { label: "Purchase", value: "PURCHASE" },
];

const getVariant = (b: boolean) => (b ? "contained" : "outlined");

// ------------------------------------------------------------------------

interface ButtonGroupProps {
    variant: IAgreementType;
    setValue: UseFormSetValue<FieldValues>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ variant, setValue }) => {
    const { t } = useTranslation();

    return (
        <MuiButtonGroup>
            {OPTIONS.map(({ label, value }) => (
                <Button
                    key={value}
                    name="variant"
                    variant={getVariant(variant === value)}
                    onClick={() => setValue("variant", value)}
                >
                    {t(label)}
                </Button>
            ))}
        </MuiButtonGroup>
    );
};

// ------------------------------------------------------------------------

const RHFButtonGroup = () => {
    const { t } = useTranslation();
    const { control, watch, setValue } = useFormContext();

    const variant = watch("variant");

    return (
        <Controller
            name="variant"
            control={control}
            render={({ fieldState: { error } }) => (
                <>
                    {variant === "BASIC_EXCLUSIVE" ? (
                        <CardLabel variant={variant} />
                    ) : null}

                    {variant !== "BASIC_EXCLUSIVE" ? (
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
