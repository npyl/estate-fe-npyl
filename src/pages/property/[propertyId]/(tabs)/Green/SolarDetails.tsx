import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, Divider, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";
import HalfCircleProgressBar from "./HalfCircleProgressBar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const xValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Sunniness Over Roof area",
        },
    },
};

interface SolarDetailsProps {
    solarInsights: any;
    panel_data: any;
}

const SolarDetails: React.FC<SolarDetailsProps> = ({
    solarInsights,
    panel_data,
}) => {
    const [chartData, setChartData] = useState<any>(null);

    const { t } = useTranslation();

    const solarPotential = solarInsights.solarPotential;

    useEffect(() => {
        var yValues = solarPotential.wholeRoofStats.sunshineQuantiles;

        setChartData({
            labels: xValues,
            datasets: [
                {
                    label: "Sunshine Quantiles",
                    data: yValues,
                    backgroundColor: "#03A9F4",
                    borderColor: "#03A9F4",
                    borderWidth: 1,
                },
            ],
        });
    }, []);

    return (
        <Paper elevation={10} sx={{ overflow: "auto" }}>
            {panel_data ? (
                <>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                            <Box>
                                <Typography variant="body1">
                                    Panels count
                                </Typography>
                                <HalfCircleProgressBar
                                    value={panel_data.panel.percent}
                                    color="primary"
                                    label={panel_data.panel.text}
                                />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1">
                                    Annual energy
                                </Typography>
                                <HalfCircleProgressBar
                                    value={panel_data.energy.percent}
                                    color="success"
                                    label={panel_data.energy.text}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider />
                </>
            ) : null}
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">
                    {t("Typical Installations")}
                </Typography>
            </Box>
            <Divider />

            <Grid container>
                <Grid item xs={12} sm={12}>
                    <List>
                        <ListItem
                            label={t("Max Panel Required")}
                            value={solarPotential.maxArrayPanelsCount}
                        />

                        <ListItem
                            label={t("Panel Lifespan(Yrs)")}
                            value={solarPotential.panelLifetimeYears}
                        />
                        <ListItem
                            label={t("Area(m²)")}
                            value={solarPotential.maxArrayAreaMeters2}
                        />

                        <ListItem
                            label={t("Max Sunshine Hours/Year")}
                            value={solarPotential.maxSunshineHoursPerYear}
                        />

                        <ListItem
                            label={t("Carbon Offset Factor (kg/MWh)")}
                            value={solarPotential.carbonOffsetFactorKgPerMwh}
                        />

                        <ListItem
                            label={t("Watts Per Panel")}
                            value={solarPotential.panelCapacityWatts}
                        />

                        <ListItem
                            label={t("Panel Dimension(m)(Height x Width)")}
                            value={
                                solarPotential.panelHeightMeters +
                                " x " +
                                solarPotential.panelWidthMeters
                            }
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {chartData ? (
                        <Bar data={chartData} options={chartOptions} />
                    ) : null}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SolarDetails;
