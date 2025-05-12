import { IEmailFilters } from "@/types/email";
import { ComponentType, FC, useCallback } from "react";
import FromLabel from "./From";
import ToLabel from "./To";
import PropertyIdsLabel from "./PropertyIds";
import Chip from "@mui/material/Chip";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";

type FilterChip = ComponentType;

const LABELS: Record<keyof IEmailFilters, FilterChip> = {
    from: FromLabel,
    propertyIds: PropertyIdsLabel,
    to: ToLabel,
};

interface GeneralChipProps {
    filterKey: keyof IEmailFilters;
}

const GeneralChip: FC<GeneralChipProps> = ({ filterKey }) => {
    const { deleteFilter } = useFiltersContext();
    const onDelete = useCallback(() => deleteFilter(filterKey), [filterKey]);

    try {
        const Label = LABELS[filterKey];
        if (!Label) return null;
        return <Chip label={<Label />} onDelete={onDelete} />;
    } catch (ex) {
        return null;
    }
};

const getChip = (key: keyof IEmailFilters) => (
    <GeneralChip key={key} filterKey={key} />
);

export default getChip;
