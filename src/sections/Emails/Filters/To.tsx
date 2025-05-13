import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, TextField, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Recipients from "../Pickers/Recipients";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";

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

    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);

    const { filters, setTo } = useFiltersContext();
    const { to } = filters;

    const [toFreeSoloed, setToFreeSoloed] = useState<string[]>([]);
    const onFreeSoloedDelete = useCallback(
        (idx: number) =>
            setToFreeSoloed((old) => old.filter((_, i) => i !== idx)),
        []
    );

    const shrink = to.length > 0 || toFreeSoloed.length > 0;

    return (
        <Recipients
            to={to}
            onChange={setTo}
            toFreeSoloed={toFreeSoloed}
            onFreeSoloed={setToFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            renderInput={(params) => (
                <TextField
                    label={t("To")}
                    sx={getTextFieldSx(shrink)}
                    {...params}
                />
            )}
        />
    );
};

export default ToFilter;
