import { useAllUsersQuery } from "@/services/user";
import { selectManagerId } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { useTranslation } from "react-i18next";

const ManagerChip = () => {
    const { t } = useTranslation();

    const userId = useSelector(selectManagerId);
    const { data: users } = useAllUsersQuery();

    const name = useMemo(() => {
        const u = users?.find(({ id }) => id === userId);
        if (!u) return "";

        return `${u.firstName} ${u.lastName}`;
    }, [userId, users]);

    return <Chip label={<ChipLabel title={t("Manager")} value={name} />} />;
};

export default ManagerChip;
