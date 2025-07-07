import { useAllUsersQuery } from "@/services/user";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import ChipLabel from "@/ui/Filters/ChipLabel";
import { useTranslation } from "react-i18next";
import {
    useFiltersContext,
    useManagerId,
} from "@/sections/Properties/FiltersContext";

const ManagerChip = () => {
    const { t } = useTranslation();

    const userId = useManagerId();
    const { data: users } = useAllUsersQuery();

    const name = useMemo(() => {
        const u = users?.find(({ id }) => id === userId);
        if (!u) return "";

        return `${u.firstName} ${u.lastName}`;
    }, [userId, users]);

    const { resetManagerId } = useFiltersContext();
    const handleClear = () => resetManagerId();

    return (
        <Chip
            label={<ChipLabel title={t("Manager")} value={name} />}
            onDelete={handleClear}
        />
    );
};

export default ManagerChip;
