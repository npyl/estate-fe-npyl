import { IEmailFilters } from "@/types/email";
import { ComponentType, FC } from "react";
import FromChip from "./From";
import PropertyIdsChip from "./PropertyIds";
import ToChip from "./To";

type FilterChip = ComponentType;

const CHIPS: Record<keyof IEmailFilters, FilterChip> = {
    from: FromChip,
    propertyIds: PropertyIdsChip,
    to: ToChip,
};

interface GeneralChipProps {
    filterKey: keyof IEmailFilters;
}

const GeneralChip: FC<GeneralChipProps> = ({ filterKey }) => {
    try {
        const Chip = CHIPS[filterKey];
        if (!Chip) return null;
        return <Chip />;
    } catch (ex) {
        return null;
    }
};

const getChip = (key: keyof IEmailFilters) => (
    <GeneralChip key={key} filterKey={key} />
);

export default getChip;
