import { IEmailFilters } from "@/types/email";
import { ComponentType, FC } from "react";
import FromChip from "./From";
import PropertyIdsChip from "./PropertyIds";
import ToChip from "./To";
import { TCodeMap } from "../useCache";
import SearchChip from "./Search";

type FilterChip = ComponentType<any>;

const CHIPS: Record<keyof IEmailFilters, FilterChip> = {
    search: SearchChip,
    from: FromChip,
    propertyIds: PropertyIdsChip,
    to: ToChip,
};

interface GeneralChipProps {
    filterKey: keyof IEmailFilters;
    CODES: TCodeMap;
}

const GeneralChip: FC<GeneralChipProps> = ({ filterKey, CODES }) => {
    try {
        const Chip = CHIPS[filterKey];
        if (!Chip) return null;

        const props = filterKey === "propertyIds" ? { CODES } : {};

        return <Chip {...props} />;
    } catch (ex) {
        return null;
    }
};

const getChip = (CODES: TCodeMap) => (key: keyof IEmailFilters) => (
    <GeneralChip key={key} filterKey={key} CODES={CODES} />
);

export default getChip;
