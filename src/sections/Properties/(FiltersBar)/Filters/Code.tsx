import { useDispatch, useSelector } from "react-redux";
import { setCode } from "src/slices/filters";
import { selectCode } from "src/slices/filters";
import { useTranslation } from "react-i18next";
import CodeSelect from "@/sections/_Autocompletes/Code";
import TextField from "@mui/material/TextField";
import { useCallback } from "react";

export default function CodeFilter() {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const code = useSelector(selectCode);

    const handleChange = useCallback(
        (_: any, _id: any, code: string) =>
            dispatch(setCode(code ? code : undefined)),
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
