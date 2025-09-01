import React from "react";
import { Grid } from "@mui/material";
import { useGetAirQualityQuery } from "@/services/googleapi";
import PollutionPanel from "./Panels/Pollution";
import OtherPollutants from "./Panels/Other";
import HealthRecommendations from "./Panels/Health";

interface Props {
    center: { lat: number; lng: number };
}

const AirQualityDetails: React.FC<Props> = ({ center }) => {
    const { data: airQualityData, isLoading } = useGetAirQualityQuery(center);

    const primaryIndex = airQualityData?.indexes[0]; // Assuming the first index is primary

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

            <Grid
                item
                xs={12}
                // ...
                component={HealthRecommendations}
                healthRecommendations={airQualityData?.healthRecommendations}
                isLoading={isLoading}
            />
        </Grid>
    );
};

export default AirQualityDetails;
