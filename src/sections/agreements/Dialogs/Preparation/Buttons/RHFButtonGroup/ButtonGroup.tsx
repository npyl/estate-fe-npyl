import { Button, ButtonGroup as MuiButtonGroup } from "@mui/material";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IAgreementType } from "@/types/agreements";

type Option = { label: string; value: IAgreementType };

const OPTIONS: Option[] = [
    { label: "Basic", value: "BASIC" },
    { label: "Basic Exclusive", value: "BASIC_EXCLUSIVE" },
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

export default ButtonGroup;
