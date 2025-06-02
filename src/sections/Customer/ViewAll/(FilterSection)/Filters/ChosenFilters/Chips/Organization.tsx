import ChipLabel from "@/sections/Filters/ChipLabel";
import { useAllOrganizationsQuery } from "@/services/organization";
import { selectOrganizationId, deleteFilter } from "@/slices/customer/filters";
import Chip from "@mui/material/Chip";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const OrganizationChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const value = useSelector(selectOrganizationId);
    const { data } = useAllOrganizationsQuery();

    const organization = useMemo(
        () => data?.find(({ id }) => id === value)?.name,
        [data, value]
    );

    const onDelete = useCallback(
        () => dispatch(deleteFilter("organizationId")),
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
