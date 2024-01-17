import { TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "src/components/hook-form";
import { useLazyCheckCodeExistsQuery } from "src/services/properties";

export interface CodeFieldProps extends Omit<TextFieldProps, "label"> {}

export const CodeField = (props: CodeFieldProps) => {
    const { t } = useTranslation();
    const { watch } = useFormContext();

    const code = watch("code");

    const [initialCode] = useState(code);
    const [error, setError] = useState("");

    const [checkCodeExists, { data: codeExists }] =
        useLazyCheckCodeExistsQuery();

    useEffect(() => {
        setError(codeExists ? "Code exists" : "");
    }, [codeExists]);

    // detect code change
    useEffect(() => {
        if (!code) return;
        if (initialCode && initialCode === code) {
            // prevent checking on property's code
            setError("");
            return;
        }
        checkCodeExists(code);
    }, [code]);

    return (
        <RHFTextField
            fullWidth
            name="code"
            label={t("Code")}
            error={!!error}
            helperText={error}
            {...props}
        />
    );
};
