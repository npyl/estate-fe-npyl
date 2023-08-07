import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyCheckCodeExistsQuery } from "src/services/properties";

export interface CodeFieldProps extends Omit<TextFieldProps, "label"> {
    code: string;
}

export const CodeField = (props: CodeFieldProps) => {
    const { code, onChange, ...rest } = props;

    const { t } = useTranslation();

    const [initialCode] = useState(code);
    const [error, setError] = useState("");

    const [checkCodeExists, { data: codeExists }] =
        useLazyCheckCodeExistsQuery();

    useEffect(() => {
        setError(codeExists ? "Code exists" : "");
    }, [codeExists]);

    // detect code change
    useMemo(() => {
        if (!code) return;
        if (initialCode && initialCode === code) {
            // prevent checking on property's code
            setError("");
            return;
        }
        checkCodeExists(code);
    }, [code]);

    return (
        <TextField
            fullWidth
            label={t("Code")}
            value={code}
            onChange={onChange}
            error={!!error}
            helperText={error}
            {...rest}
        />
    );
};
