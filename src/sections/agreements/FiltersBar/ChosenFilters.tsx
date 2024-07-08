import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack, { StackProps } from "@mui/material/Stack";
import { useAgreementsFiltersContext } from "./FiltersContext";
import React from "react";

const getValue = (v: any) => (typeof v === "boolean" ? (v ? "yes" : "no") : v);

const ChosenFilters: React.FC<StackProps> = (props) => {
    const { changedFields, clearFilter } = useAgreementsFiltersContext();

    if (Object.keys(changedFields).length === 0) return null;

    return (
        <Stack {...props} direction="row" mt={1} gap={0.5}>
            {Object.entries(changedFields).map(([key, value]) => (
                <Chip
                    key={key}
                    label={
                        <Typography>{`${key}: ${getValue(value)}`}</Typography>
                    }
                    onDelete={() => clearFilter(key)}
                />
            ))}
        </Stack>
    );
};

export default ChosenFilters;
