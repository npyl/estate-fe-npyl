import ChipLabel from "@/sections/Filters/ChipLabel";
import { useAllOrganizationsQuery } from "@/services/organization";
import { selectOrganizations, deleteFilter } from "@/slices/log";
import Chip from "@mui/material/Chip";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const OrganizationChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const value = useSelector(selectOrganizations)?.at(0);
    const { data } = useAllOrganizationsQuery();

    const organization = useMemo(
        () => data?.find(({ id }) => id === value)?.name,
        [data, value]
    );

    const onDelete = useCallback(
        () => dispatch(deleteFilter("organizations")),
        []
    );

    if (!organization) return null;

    return (
        <Chip
            label={<ChipLabel title={t("Organization")} value={organization} />}
            onDelete={onDelete}
        />
    );
};

export default OrganizationChip;
