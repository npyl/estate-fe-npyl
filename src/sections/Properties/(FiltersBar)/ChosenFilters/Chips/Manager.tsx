import { useAllUsersQuery } from "@/services/user";
import { deleteFilter, selectManagerId } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import ChipLabel from "./ChipLabel";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const ManagerChip = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { t } = useTranslation();

    const userId = useSelector(selectManagerId);
    const { data: users } = useAllUsersQuery();

    const name = useMemo(() => {
        const u = users?.find(({ id }) => id === userId);
        if (!u) return "";

        return `${u.firstName} ${u.lastName}`;
    }, [userId, users]);

    const handleClear = () => {
        dispatch(deleteFilter("managerId"));

        // Remove 'assignee' from the URL if exists
        const newQuery = { ...router.query };
        delete newQuery.assignee;

        router.replace(
            { pathname: router.pathname, query: newQuery },
            undefined,
            { shallow: true } //prevent unnecessary page reload
        );
    };

    return (
        <Chip
            label={<ChipLabel title={t("Manager")} value={name} />}
            onDelete={handleClear}
        />
    );
};

export default ManagerChip;
