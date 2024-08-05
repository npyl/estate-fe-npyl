import React from "react";
import { Stack } from "@mui/material";
import { t } from "i18next";
import { NormalBadge } from "@/components/PropertyCard/styled"; // Adjust the path as necessary

interface TourPropertyBadgesProps {
    stateValue: string;
    code: string;
}

const TourPropertyBadges: React.FC<TourPropertyBadgesProps> = ({
    stateValue,
    code,
}) => {
    return (
        <Stack direction="row" gap={2}>
            <NormalBadge
                name={stateValue}
                color="#3730a3"
                sx={{
                    textWrap: "nowrap",

                    width: "100%",
                    color: "#3730a3",
                }}
            />
            <NormalBadge
                name={`${t("Code")}: ${code}`}
                color="#ffcc00"
                sx={{
                    textWrap: "nowrap",
                    width: "100%",
                    color: "#854D0E",
                }}
            />
        </Stack>
    );
};

export default TourPropertyBadges;
