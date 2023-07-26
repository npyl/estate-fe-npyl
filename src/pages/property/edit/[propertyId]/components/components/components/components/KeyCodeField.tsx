import { TextField, TextFieldProps } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyCheckKeyCodeExistsQuery } from "src/services/properties";

export interface KeyCodeFieldProps extends Omit<TextFieldProps, "label"> {
	keyCode: string;
}

export const KeyCodeField = (props: KeyCodeFieldProps) => {
	const { keyCode, onChange, ...rest } = props;

	const { t } = useTranslation();

	const [initialKeyCode] = useState(keyCode);
	const [error, setError] = useState("");

	const [checkKeyCodeExists, { data: keyCodeExists }] =
		useLazyCheckKeyCodeExistsQuery();

	useEffect(() => {
		setError(keyCodeExists ? "Key Code exists" : "");
	}, [keyCodeExists]);

	// detect keyCode change
	useMemo(() => {
		if (!keyCode) return;
		if (initialKeyCode && initialKeyCode === keyCode) {
			// prevent checking on property's keyCode
			setError("");
			return;
		}
		checkKeyCodeExists(keyCode);
	}, [keyCode]);

	return (
		<TextField
			fullWidth
			label={t("Key Code")}
			value={keyCode}
			onChange={onChange}
			error={!!error}
			helperText={error}
			{...rest}
		/>
	);
};
