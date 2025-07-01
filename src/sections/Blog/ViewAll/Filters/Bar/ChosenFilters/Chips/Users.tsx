import ChipLabel from "@/ui/Filters/ChipLabel";
import Chip from "@mui/material/Chip";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFiltersContext } from "../../../Context";
import { useAllUsersQuery } from "@/services/user";

const UsersChip = () => {
    const { t } = useTranslation();
    const {
        deleteFilter,
        filters: { users },
    } = useFiltersContext();
    const { data } = useAllUsersQuery();
    const label = useMemo(
        () =>
            data
                ?.filter(({ id }) => users.includes(id))
                ?.map(({ firstName, lastName }) => `${firstName} ${lastName}`)
                ?.join(", ") || "",
        [data, users]
    );
    const onDelete = useCallback(() => deleteFilter("users"), []);
    return (
        <Chip
            label={<ChipLabel title={t("User")} value={label} />}
            onDelete={onDelete}
        />
    );
};

export default UsersChip;
