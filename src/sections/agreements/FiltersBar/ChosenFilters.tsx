import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack, { StackProps } from "@mui/material/Stack";
import { useAgreementsFiltersContext } from "./FiltersContext";
import React from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { TranslationType } from "@/types/translation";

// ------------------------------------------------------------------------

const getBoolean = (b: boolean) => (b ? "_YES_" : "_NO_");
const getDate = (s: string) => dayjs(s).toDate().toLocaleString();

const getValue = (v: any, t: TranslationType) =>
    typeof v === "boolean"
        ? t(getBoolean(v))
        : typeof v === "string" && v.includes(":")
        ? getDate(v)
        : v.map((v: string) => t(`_${v}_`));

// ------------------------------------------------------------------------

interface ChosenChipProps {
    filterKey: string;
    value: string;
    onDelete: (key: string) => void;
}

const ChosenChip: React.FC<ChosenChipProps> = ({
    filterKey,
    value,
    onDelete,
}) => {
    const { t } = useTranslation();

    const key = t(`_${filterKey}_`);
    const val = getValue(value, t);

    const label = <Typography>{`${key}: ${val}`}</Typography>;

    return <Chip label={label} onDelete={() => onDelete(filterKey)} />;
};

const ChosenFilters: React.FC<StackProps> = (props) => {
    const { changedFields, clearFilter } = useAgreementsFiltersContext();

    if (Object.keys(changedFields).length === 0) return null;

    return (
        <Stack {...props} direction="row" mt={1} gap={0.5}>
            {Object.entries(changedFields).map(([key, value]) => (
                <ChosenChip
                    key={key}
                    filterKey={key}
                    value={value}
                    onDelete={clearFilter}
                />
            ))}
        </Stack>
    );
};

export default ChosenFilters;
