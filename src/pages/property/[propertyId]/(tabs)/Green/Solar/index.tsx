import React, { useMemo } from "react";
import { Typography, Stack } from "@mui/material";
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
import { BuildingInsights } from "../types";
import { TranslationType } from "@/types/translation";
import { formatThousands } from "@/utils/formatNumber";
import Panel from "../Panel";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const xValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const getChartOptions = (t: TranslationType) => ({
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: false,
        },
    },
});

interface SolarDetailsProps {
    solarInsights: BuildingInsights;
    panel_data: any;
}

const SolarDetails: React.FC<SolarDetailsProps> = ({
    solarInsights,
    panel_data,
}) => {
    const { t } = useTranslation();

    const solarPotential = solarInsights.solarPotential;
    var yValues = solarPotential.wholeRoofStats.sunshineQuantiles;

    const chartData = useMemo(
        () => ({
            labels: xValues,
            datasets: [
                {
                    label: t("Sunshine Quantiles"),
                    data: yValues,
                    backgroundColor: "#03A9F4",
                    borderColor: "#03A9F4",
                    borderWidth: 1,
                },
            ],
        }),
        [yValues, t]
    );

    const chartOptions = useMemo(() => getChartOptions(t), [t]);

    return (
        <Stack spacing={1}>
            {panel_data ? (
                <Panel title={t("Current Installation")}>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-around"
                        alignItems="center"
                        gap={1}
                        p={5}
                    >
                        <Stack alignItems="center">
                            <Typography variant="body1">
                                {t("Panels count")}
                            </Typography>
                            <HalfCircleProgressBar
                                value={panel_data.panel.percent}
                                color="primary"
                                label={panel_data.panel.text}
                            />
                        </Stack>

                        <Stack alignItems="center">
                            <Typography variant="body1">
                                {t("Annual energy")}
                            </Typography>
                            <HalfCircleProgressBar
                                value={panel_data.energy.percent}
                                color="success"
                                label={formatThousands(panel_data.energy.text)}
                            />
                        </Stack>
                    </Stack>
                </Panel>
            ) : null}

            <Panel
                title={t("Maximum Gain Installation")}
                contentProps={{
                    p: 0,
                }}
            >
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
                        value={solarPotential.maxArrayAreaMeters2.toFixed(2)}
                    />

                    <ListItem
                        label={t("Max Sunshine Hours/Year")}
                        value={solarPotential.maxSunshineHoursPerYear.toFixed(
                            2
                        )}
                    />

                    <ListItem
                        label={t("Carbon Offset Factor (kg/MWh)")}
                        value={solarPotential.carbonOffsetFactorKgPerMwh.toFixed(
                            2
                        )}
                    />

                    <ListItem
                        label={t("Watts Per Panel")}
                        value={solarPotential.panelCapacityWatts.toFixed(2)}
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
            </Panel>

            {chartData ? (
                <Panel title={t("Sunniness Over Roof area")}>
                    <Bar data={chartData} options={chartOptions} />
                </Panel>
            ) : null}
        </Stack>
    );
};

export default SolarDetails;
