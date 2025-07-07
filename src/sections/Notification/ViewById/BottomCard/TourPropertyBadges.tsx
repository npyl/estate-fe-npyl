import React from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NormalBadge } from "@/ui/Cards/PropertyCard/styled"; // Adjust the path as necessary

interface TourPropertyBadgesProps {
    stateValue: string;
    code: string;
}

const TourPropertyBadges: React.FC<TourPropertyBadgesProps> = ({
    stateValue,
    code,
}) => {
    const { t } = useTranslation();

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
                    color: (theme) =>
                        theme.palette.mode === "light" ? "#854D0E" : "null",

                    "&:hover": {
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "#d4a500"
                                : "#b38f00",
                    },
                }}
            />
        </Stack>
    );
};

export default TourPropertyBadges;
