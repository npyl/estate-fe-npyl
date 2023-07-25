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

	const [afterChange, setAfterChange] = useState(false);
	const [error, setError] = useState("");

	const [checkCodeExists, { data: codeExists }] = useLazyCheckCodeExistsQuery();

	useEffect(() => {
		setError(codeExists ? "Code exists" : "");
	}, [codeExists]);

	// detect code change
	useMemo(() => {
		if (!code || !afterChange) return;
		checkCodeExists(code);
	}, [code, afterChange]);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setAfterChange(true); // ignore first value
		onChange && onChange(event);
	};

	return (
		<TextField
			label={t("Code")}
			value={code}
			onChange={handleChange}
			error={!!error}
			helperText={error}
			{...rest}
		/>
	);
};
