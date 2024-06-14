import { Typography, Box, Stack, StackProps, Skeleton } from "@mui/material";
import Panel from "../Panel";
import React from "react";
import { Index } from "@/types/googleapi";
import Gauge from "./Gauge";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------------------

const AirQualityLabelSkeleton: React.FC<StackProps> = (props) => (
    <Stack {...props} alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5">Universal AQI:</Typography>
            <Skeleton variant="text" width="50px" height="45px" />
        </Stack>
        <Skeleton variant="text" width="100%" height="45px" />
    </Stack>
);

interface AirQualityLabelProps extends StackProps {
    percentage: number;
    quality: string;
    isLoading: boolean;
}

const AirQualityLabel: React.FC<AirQualityLabelProps> = ({
    percentage,
    quality,
    isLoading,
    ...props
}) =>
    isLoading ? (
        <AirQualityLabelSkeleton {...props} />
    ) : (
        <Stack {...props} alignItems="center">
            <Typography variant="h5">Universal AQI: {percentage}</Typography>
            <Typography fontWeight="600">{quality}</Typography>
        </Stack>
    );

// ------------------------------------------------------------------------------

interface PollutionPanelProps {
    findAqi?: Index;
    isLoading: boolean;
}

const PollutionPanel: React.FC<PollutionPanelProps> = ({
    findAqi,
    isLoading,
}) => {
    const { t } = useTranslation();

    return (
        <Panel
            title={`${t("Air Pollution")} - ${new Date().toLocaleDateString()}`}
        >
            <Typography variant="h6" gutterBottom>
                {t("Dominant Pollutants")}: {findAqi?.dominantPollutant}
            </Typography>

            <Box position="relative" height="400px">
                <Gauge value={findAqi?.aqi || 0} />

                <AirQualityLabel
                    percentage={findAqi?.aqi || 0}
                    quality={findAqi?.category || ""}
                    isLoading={isLoading}
                    position="absolute"
                    bottom="100px"
                    left="50%"
                    style={{ transform: "translateX(-50%)" }}
                />
            </Box>
        </Panel>
    );
};

export default PollutionPanel;
