import { useTranslation } from "react-i18next";
import CodeSelect from "@/ui/Autocompletes/Code";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";
import { useCode, useFiltersContext } from "../../FiltersContext";

export default function CodeFilter() {
    const { t } = useTranslation();

    const code = useCode();
    const { setCode } = useFiltersContext();

    const handleChange = useCallback(
        (_: any, _id: any, code: string) => setCode(code ? code : undefined),
        []
    );

    return (
        <CodeSelect
            codeValue={code}
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
