import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, TextField, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Recipients from "../Pickers/Recipients";
import { useCallback } from "react";

const TextFieldSx: SxProps<Theme> = {
    minWidth: "200px",
    maxWidth: "fit-content",
};

const ToFilter = () => {
    const { t } = useTranslation();

    const {
        filters: { to },
        setTo,
        toFreeSoloed,
        setToFreeSoloed,
    } = useFiltersContext();

    const onFreeSoloedDelete = useCallback(
        (idx: number) =>
            setToFreeSoloed((old) => old.filter((_, i) => i !== idx)),
        []
    );

    return (
        <Recipients
            to={to}
            onChange={setTo}
            toFreeSoloed={toFreeSoloed}
            onFreeSoloed={setToFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            renderInput={(params) => (
                <TextField label={t("To")} sx={TextFieldSx} {...params} />
            )}
        />
    );
};

export default ToFilter;
