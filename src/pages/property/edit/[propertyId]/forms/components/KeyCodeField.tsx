import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RHFTextField } from "src/components/hook-form";
import { useLazyCheckKeyCodeExistsQuery } from "src/services/properties";

export interface KeyCodeFieldProps extends Omit<TextFieldProps, "label"> {}

export const KeyCodeField = (props: KeyCodeFieldProps) => {
    const { t } = useTranslation();
    const { watch } = useFormContext();

    const keyCode = watch("keyCode");

    const [initialKeyCode] = useState(keyCode);
    const [error, setError] = useState("");

    const [checkKeyCodeExists, { data: keyCodeExists }] =
        useLazyCheckKeyCodeExistsQuery();

    useEffect(() => {
        setError(keyCodeExists ? "Key Code exists" : "");
    }, [keyCodeExists]);

    // detect keyCode change
    useEffect(() => {
        if (!keyCode) return;
        if (initialKeyCode && initialKeyCode === keyCode) {
            // prevent checking on property's keyCode
            setError("");
            return;
        }
        checkKeyCodeExists(keyCode);
    }, [keyCode]);

    return (
        <RHFTextField
            fullWidth
            name="keyCode"
            label={t("Key Code")}
            error={!!error}
            helperText={error}
            {...props}
        />
    );
};
