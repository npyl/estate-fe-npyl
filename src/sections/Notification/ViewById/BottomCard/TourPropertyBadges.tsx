import React from "react";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import CodeBadgeLink from "../../_shared/CodeBadgeLink";
import { NormalBadge } from "@/ui/Cards/PropertyCard/styled";

interface TourPropertyBadgesProps {
    propertyId?: number;
    stateValue: string;
    code: string;
}

const TourPropertyBadges: React.FC<TourPropertyBadgesProps> = ({
    propertyId,
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
                    color: "#3730a3",
                }}
            />
            <CodeBadgeLink
                code={`${t("Code")}: ${code}`}
                propertyId={propertyId}
            />
        </Stack>
    );
};

export default TourPropertyBadges;
