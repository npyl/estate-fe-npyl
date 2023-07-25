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

	const [afterChange, setAfterChange] = useState(false);
	const [error, setError] = useState("");

	const [checkKeyCodeExists, { data: keyCodeExists }] =
		useLazyCheckKeyCodeExistsQuery();

	useEffect(() => {
		setError(keyCodeExists ? "Key Code exists" : "");
	}, [keyCodeExists]);

	// detect keyCode change
	useMemo(() => {
		if (!keyCode || !afterChange) return;
		checkKeyCodeExists(keyCode);
	}, [keyCode, afterChange]);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setAfterChange(true); // ignore first value
		onChange && onChange(event);
	};

	return (
		<TextField
			label={t("Key Code")}
			value={keyCode}
			onChange={handleChange}
			error={!!error}
			helperText={error}
			{...rest}
		/>
	);
};
