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
            <NormalBadge
                name={stateValue}
                color="#3730a3"
                sx={{
                    width: "100%",
                    color: "#3730a3",
                }}
            />
        </Stack>
    );
};

export default ListingStateBadge;
