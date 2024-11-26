import { useAllUsersQuery } from "@/services/user";
import { deleteFilter, selectManagerId } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ManagerChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const userId = useSelector(selectManagerId);
    const { data: users } = useAllUsersQuery();

    const name = useMemo(() => {
        const u = users?.find(({ id }) => id === userId);
        if (!u) return "";

        return `${u.firstName} ${u.lastName}`;
    }, [userId, users]);

    const handleClear = () => dispatch(deleteFilter("managerId"));

    return (
        <Chip
            label={<ChipLabel title={t("Manager")} value={name} />}
            onDelete={handleClear}
        />
    );
};

export default ManagerChip;
