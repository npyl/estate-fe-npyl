import React from "react";
import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
import {
    FiberManualRecord,
    BeachAccess,
    SentimentVeryDissatisfied,
    Face,
    PregnantWoman,
    ChildCare,
    SportsSoccer,
} from "@mui/icons-material";
import AirQualityService from "./services/AirQualityService";

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

interface Props {
    airQualityData: AirQualityData;
}

const AirQualityDetails: React.FC<Props> = ({ airQualityData }) => {
    // Find the dominant pollutant
    //   const dominantPollutant = airQualityData.indexes.find(index => index.displayName === airQualityData.indexes.find(ind => ind.dominantPollutant).displayName);
    // console.log(dominantPollutant);
    const primaryIndex = airQualityData?.indexes[0]; // Assuming the first index is primary
    const progress = Math.min(primaryIndex.aqi / 500, 1);

    // Define icons for each health recommendation
    const findAqi = airQualityData?.indexes.find((item) => item.code == "uaqi");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Air Quality Information
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="body1">
                    {new Date(airQualityData.dateTime).toLocaleDateString()}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                {findAqi ? (
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Dominant Pollutants: {findAqi.dominantPollutant}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                            }}
                        >
                            <FiberManualRecord
                                sx={{ color: findAqi.color, mr: 1 }}
                            />
                            <Typography variant="body2">
                                {findAqi.displayName}: {findAqi.aqi} -{" "}
                                {findAqi.category}
                            </Typography>
                        </Box>
                        <Box>
                            <Box width="200px" margin="auto">
                                <Box width="200px" height="100px">
                                    <Box
                                        position="relative"
                                        height="100px"
                                        marginBottom="10px"
                                        borderRadius="150px 150px 0 0"
                                        overflow="hidden"
                                        textAlign="center"
                                    >
                                        <Box
                                            position="absolute"
                                            top="100px"
                                            left="-200%"
                                            width="400%"
                                            height="400%"
                                            marginLeft="100px"
                                            border="5px solid white"
                                            sx={{
                                                transform:
                                                    "rotate( " +
                                                    AirQualityService.valueToAngle(
                                                        findAqi.aqi
                                                    ) +
                                                    "deg)",
                                            }}
                                        />

                                        <Box
                                            width="178px"
                                            position="absolute"
                                            top="10px"
                                            right="10px"
                                            left="10px"
                                            height="140px"
                                            bgcolor="#fff"
                                            borderRadius="150px 150px 0 0"
                                        />
                                        <Typography
                                            sx={{
                                                position: "absolute",
                                                top: "60%",
                                                left: "0",
                                                width: "100%",
                                                fontSize: "28px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            {findAqi.aqi}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        sx={{
                                            float: "left",
                                        }}
                                    >
                                        0
                                    </Typography>
                                    <Typography
                                        sx={{
                                            float: "right",
                                        }}
                                    >
                                        100
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                ) : null}
            </Grid>

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

            <Grid item xs={12}>
                <Box
                    display="flex"
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
                </Box>
            </Grid>
        </Grid>
    );
};

export default AirQualityDetails;
