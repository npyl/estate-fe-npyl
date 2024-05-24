import React from "react";
import { Grid, Typography, Box, CircularProgress, Stack } from "@mui/material";
import {
    BeachAccess,
    SentimentVeryDissatisfied,
    Face,
    PregnantWoman,
    ChildCare,
    SportsSoccer,
} from "@mui/icons-material";
import PollutionPanel from "./Polution";
import { Index } from "./types";
import Panel from "./Panel";

interface AirQualityData {
    dateTime: string;
    regionCode: string;
    indexes: Index[];
    pollutants: Pollutant[];
    healthRecommendations: { [key: string]: string };
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

interface Props {
    airQualityData: AirQualityData;
}

const AirQualityDetails: React.FC<Props> = ({ airQualityData }) => {
    const primaryIndex = airQualityData?.indexes[0]; // Assuming the first index is primary
    const progress = Math.min(primaryIndex.aqi / 500, 1);

    // Define icons for each health recommendation
    const findAqi = airQualityData?.indexes.find((item) => item.code == "uaqi");

    return (
        <Grid container gap={1}>
            {findAqi ? (
                <Grid
                    item
                    xs={12}
                    // ...
                    component={PollutionPanel}
                    findAqi={findAqi}
                />
            ) : null}

            <Grid item xs={12} component={Panel} title="Other Pollutants">
                {airQualityData.pollutants.map((pollutant, pollutantKey) => (
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
                ))}
            </Grid>

            <Grid item xs={12} component={Panel} title="Health Recommendations">
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
