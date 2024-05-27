import { Typography, Box, Stack, StackProps } from "@mui/material";
import Panel from "./Panel";
import React from "react";
import { Index } from "@/types/googleapi";
import dynamic from "next/dynamic";

const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false,
});

// ------------------------------------------------------------------------------

interface AirQualityLabelProps extends StackProps {
    percentage: number;
    quality: string;
}

const AirQualityLabel: React.FC<AirQualityLabelProps> = ({
    percentage,
    quality,
    ...props
}) => (
    <Stack {...props} alignItems="center">
        <Typography variant="h5">Universal AQI: {percentage}</Typography>
        <Typography fontWeight="600">{quality}</Typography>
    </Stack>
);

// ------------------------------------------------------------------------------

interface PollutionPanelProps {
    findAqi: Index;
}

const PollutionPanel: React.FC<PollutionPanelProps> = ({ findAqi }) => (
    <Panel title={`Air Pollution - ${new Date().toLocaleDateString()}`}>
        <Typography variant="h6" gutterBottom>
            Dominant Pollutants: {findAqi.dominantPollutant}
        </Typography>

        <Box position="relative" height="400px">
            <GaugeComponent
                type="semicircle"
                arc={{
                    width: 0.07,
                    colorArray: ["#00FF00", "#FFFF00", "#FFA500", "#FF0000"],
                    padding: 0.005,
                    subArcs: [
                        { limit: 20 },
                        { limit: 40 },
                        { limit: 60 },
                        { limit: 80 },
                        { limit: 100 },
                    ],
                }}
                labels={{
                    tickLabels: {
                        ticks: [
                            { value: 0 },
                            { value: 20 },
                            { value: 40 },
                            { value: 60 },
                            { value: 80 },
                            { value: 100 },
                        ],
                    },
                    valueLabel: {
                        hide: true,
                    },
                }}
                value={findAqi.aqi}
                pointer={{ type: "blob", animationDelay: 0 }}
            />

            <AirQualityLabel
                percentage={findAqi.aqi}
                quality={findAqi.category}
                position="absolute"
                bottom="100px"
                left="50%"
                style={{ transform: "translateX(-50%)" }}
            />
        </Box>
    </Panel>
);

export default PollutionPanel;
