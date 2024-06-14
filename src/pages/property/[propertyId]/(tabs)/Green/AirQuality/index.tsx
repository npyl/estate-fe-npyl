import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import {
    BeachAccess,
    SentimentVeryDissatisfied,
    Face,
    PregnantWoman,
    ChildCare,
    SportsSoccer,
} from "@mui/icons-material";
import PollutionPanel from "./Panels/Polution";
import Panel from "./Panel";
import { useGetAirQualityQuery } from "@/services/googleapi";
import OtherPollutants from "./Panels/Other";

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
    center: { lat: number; lng: number };
}

const AirQualityDetails: React.FC<Props> = ({ center }) => {
    const { data: airQualityData, isLoading } = useGetAirQualityQuery(center);

    const primaryIndex = airQualityData?.indexes[0]; // Assuming the first index is primary
    const progress = Math.min((primaryIndex?.aqi ?? 0) / 500, 1);

    // Define icons for each health recommendation
    const findAqi = airQualityData?.indexes.find((item) => item.code == "uaqi");

    return (
        <Grid container gap={1}>
            <Grid
                item
                xs={12}
                // ...
                component={PollutionPanel}
                findAqi={findAqi}
                isLoading={isLoading}
            />

            <Grid
                item
                xs={12}
                // ...
                component={OtherPollutants}
                pollutants={airQualityData?.pollutants || []}
                isLoading={isLoading}
            />

            <Grid item xs={12} component={Panel} title="Health Recommendations">
                {Object.entries(
                    airQualityData?.healthRecommendations || {}
                ).map(([key, value], recommendationKey) => (
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
                ))}
            </Grid>

            {/* <Grid
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
            </Grid> */}
        </Grid>
    );
};

export default AirQualityDetails;
