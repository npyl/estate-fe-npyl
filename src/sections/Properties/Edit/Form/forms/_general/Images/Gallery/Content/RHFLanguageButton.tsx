import LanguageButton, {
    LanguageButtonProps,
} from "@/components/LanguageButton";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface RHFLanguageButtonProps
    extends Omit<LanguageButtonProps, "value" | "onChange"> {
    name: string;
}

const RHFLanguageButton: FC<RHFLanguageButtonProps> = ({ name, ...props }) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                <LanguageButton
                    language={value}
                    onLanguageChange={onChange}
                    {...props}
                />
            )}
        />
    );
};

export default RHFLanguageButton;
