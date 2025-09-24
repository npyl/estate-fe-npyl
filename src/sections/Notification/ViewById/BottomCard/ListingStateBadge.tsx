import React from "react";
import { Stack } from "@mui/material";
import { NormalBadge } from "@/ui/Cards/PropertyCard/styled"; // Adjust the path as necessary

interface ListingStateBadgeProps {
    stateValue: string;
}

const ListingStateBadge: React.FC<ListingStateBadgeProps> = ({
    stateValue,
}) => {
    return (
        <Stack direction="row" gap={2}>
            <NormalBadge name={stateValue} />
        </Stack>
    );
};

export default ListingStateBadge;
