import { useDispatch, useSelector } from "react-redux";
import { setCode } from "src/slices/filters";
import { selectCode } from "src/slices/filters";
import { useTranslation } from "react-i18next";
import CodeSelect from "@/sections/CodeSelect";
import TextField from "@mui/material/TextField";

export default function CodeFilter() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const propertyCode = useSelector(selectCode) || "";

    const handleChange = (_event: any, value: string | null) => {
        dispatch(
            setCode(
                // On autofill we get a stringified value.
                value ? value : undefined
            )
        );
    };

    return (
        <CodeSelect
            value={propertyCode}
            onChange={handleChange}
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
