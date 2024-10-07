import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCode } from "src/slices/filters";
import { useSelector } from "react-redux";
import { useAllPropertiesQuery } from "src/services/properties";
import { selectCode } from "src/slices/filters";
import { useTranslation } from "react-i18next";

export default function CodeSelect() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const propertyCode = useSelector(selectCode);

    const propertyCodes: string[] =
        useAllPropertiesQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter(({ code }) => Boolean(code))
                    .map(({ code }) => code),
            }),
        }).data || [];

    const handleChange = (_event: any, value: string | null) => {
        dispatch(
            setCode(
                // On autofill we get a stringified value.
                value ? value : undefined
            )
        );
    };

    return (
        <Autocomplete
            disableClearable
            value={propertyCode}
            onChange={handleChange}
            options={propertyCodes}
            renderInput={(params) => (
                <TextField
                    sx={{
                        width: 135,
                    }}
                    label={t("Code")}
                    {...params}
                />
            )}
        />
    );
}
