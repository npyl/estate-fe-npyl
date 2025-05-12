import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, TextField, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Recipients from "../Pickers/Recipients";
import { useCallback, useState } from "react";

const LabelSx: SxProps<Theme> = {
    bgcolor: "white",
    borderRadius: 1,
    px: 0.3,
    top: 0,
};

const getTextFieldSx = (shrink: boolean): SxProps<Theme> => ({
    minWidth: "200px",
    maxWidth: "fit-content",

    "& .MuiInputLabel-root": {
        ...(shrink ? LabelSx : {}),
    },

    "& input:focus": {
        "& .MuiInputLabel-root": LabelSx,
    },
});

const ToFilter = () => {
    const { t } = useTranslation();

    const { filters, setTo } = useFiltersContext();
    const { to } = filters;

    const [toFreeSoloed, setToFreeSoloed] = useState<string[]>([]);
    const onFreeSoloedDelete = useCallback(
        (idx: number) =>
            setToFreeSoloed((old) => old.filter((_, i) => i !== idx)),
        []
    );

    const shrink = to.length > 0 || toFreeSoloed.length > 0;

    // INFO: prevent picker on customer view
    const router = useRouter();
    const { customerId } = router.query;
    if (Boolean(customerId)) return null;

    return (
        <Recipients
            to={to}
            onChange={setTo}
            toFreeSoloed={toFreeSoloed}
            onFreeSoloed={setToFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            renderInput={(params) => (
                <TextField
                    label={t("Customer")}
                    sx={getTextFieldSx(shrink)}
                    {...params}
                />
            )}
        />
    );
};

export default ToFilter;
