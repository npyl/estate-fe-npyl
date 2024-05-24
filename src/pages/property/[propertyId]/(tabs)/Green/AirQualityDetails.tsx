import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Box,
    CircularProgress,
    Stack,
    StackProps,
    PaperProps,
    Divider,
} from "@mui/material";
import {
    BeachAccess,
    SentimentVeryDissatisfied,
    Face,
    PregnantWoman,
    ChildCare,
    SportsSoccer,
} from "@mui/icons-material";

import { getBorderColor2 } from "@/theme/borderColor";

import { styled } from "@mui/material/styles";

import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import("react-gauge-component"), {
    ssr: false,
});

interface AirQualityData {
    dateTime: string;
    regionCode: string;
    indexes: Index[];
    pollutants: Pollutant[];
    healthRecommendations: { [key: string]: string };
}

interface Index {
    code: string;
    displayName: string;
    aqi: number;
    category: string;
    dominantPollutant: string;
    color: string;
}

interface Pollutant {
    code: string;
    displayName: string;
    fullName: string;
    concentration: {
        value: number;
        units: string;
    };
    additionalInfo: {
        sources: string;
        effects: string;
    };
}

const healthRecommendationIcons: { [key: string]: JSX.Element } = {
    generalPopulation: <BeachAccess />,
    elderly: <SentimentVeryDissatisfied />,
    lungDiseasePopulation: <Face />,
    heartDiseasePopulation: <Face />,
    athletes: <SportsSoccer />,
    pregnantWomen: <PregnantWoman />,
    children: <ChildCare />,
};

const PanelPaper = styled(Paper)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
}));

interface PanelProps extends PaperProps {
    title: string;
}

const Panel: React.FC<PanelProps> = ({ title, children, ...props }) => (
    <PanelPaper {...props} elevation={2}>
        <Typography textAlign="center" py={2} variant="h6">
            {title}
        </Typography>
        <Divider />
        <Stack p={2} spacing={1}>
            {children}
        </Stack>
    </PanelPaper>
);

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

interface Props {
    airQualityData: AirQualityData;
}

const AirQualityDetails: React.FC<Props> = ({ airQualityData }) => {
    const primaryIndex = airQualityData?.indexes[0]; // Assuming the first index is primary
    const progress = Math.min(primaryIndex.aqi / 500, 1);

    // Define icons for each health recommendation
    const findAqi = airQualityData?.indexes.find((item) => item.code == "uaqi");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} component={Typography} variant="body1">
                {new Date(airQualityData.dateTime).toLocaleDateString()}
            </Grid>

            {findAqi ? (
                <Grid item xs={12}>
                    <Panel title="Air Pollution">
                        <Typography variant="h6" gutterBottom>
                            Dominant Pollutants: {findAqi.dominantPollutant}
                        </Typography>

                        <Box position="relative">
                            <GaugeComponent
                                type="semicircle"
                                arc={{
                                    width: 0.07,
                                    colorArray: [
                                        "#00FF00",
                                        "#FFFF00",
                                        "#FFA500",
                                        "#FF0000",
                                    ],
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
                </Grid>
            ) : null}

            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Other Pollutants:
                    </Typography>
                    {airQualityData.pollutants.map(
                        (pollutant, pollutantKey) => (
                            <Box key={pollutantKey} sx={{ mb: 1 }}>
                                <Typography variant="body2">
                                    {pollutant.displayName}:{" "}
                                    {pollutant.concentration.value}{" "}
                                    {pollutant.concentration.units}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Sources:</strong>{" "}
                                    {pollutant.additionalInfo.sources}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Effects:</strong>{" "}
                                    {pollutant.additionalInfo.effects}
                                </Typography>
                            </Box>
                        )
                    )}
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Health Recommendations:
                    </Typography>
                    {Object.entries(airQualityData.healthRecommendations).map(
                        ([key, value], recommendationKey) => (
                            <Box
                                key={recommendationKey}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }}
                            >
                                {
                                    healthRecommendationIcons[
                                        key as keyof typeof healthRecommendationIcons
                                    ]
                                }
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                    {value}
                                </Typography>
                            </Box>
                        )
                    )}
                </Paper>
            </Grid>

            <Grid
                item
                xs={12}
                component={Stack}
                alignItems="center"
                justifyContent="center"
                mt={2}
            >
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={150}
                    thickness={5}
                />
            </Grid>
        </Grid>
    );
};

export default AirQualityDetails;
