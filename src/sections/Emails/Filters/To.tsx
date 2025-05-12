import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Recipients from "../Pickers/Recipients";
import { useCallback, useState } from "react";

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

    // INFO: prevent picker on customer view
    const router = useRouter();
    const { customerId } = router.query;
    if (Boolean(customerId)) return null;

    return (
        <Recipients
            // sx={Sx}
            to={to}
            onChange={setTo}
            toFreeSoloed={toFreeSoloed}
            onFreeSoloed={setToFreeSoloed}
            onFreeSoloedDelete={onFreeSoloedDelete}
            renderInput={(params) => (
                <TextField label={t("Customer")} {...params} />
            )}
        />
    );
};

export default ToFilter;
