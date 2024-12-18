import { Card, CardHeader, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import useChart from "@/components/chart/use-chart";
import Chart from "@/components/chart";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useGetDashboardQuery } from "@/services/dashboard";

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
    height: CHART_HEIGHT,
    "& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject": {
        height: `100% !important`,
    },
    "& .apexcharts-legend": {
        height: LEGEND_HEIGHT,
        borderTop: `dashed 1px ${theme.palette.divider}`,
        top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
    },
}));

interface TotalPropertiesProps {
    title: string;
    subheader: string;
}

export default function TotalProperties({
    title,
    subheader,
}: TotalPropertiesProps) {
    const theme = useTheme();

    const { t } = useTranslation();
    const { data } = useGetDashboardQuery();

    const series = useMemo(
        () =>
            data?.propertiesDistribution
                ? [
                      {
                          label: t("Residential"),
                          value: data.propertiesDistribution.residential ?? 0,
                      },
                      {
                          label: t("Commercial"),
                          value: data.propertiesDistribution.commercial ?? 0,
                      },
                      {
                          label: t("Land"),
                          value: data?.propertiesDistribution.land ?? 0,
                      },
                      {
                          label: t("Other"),
                          value: data?.propertiesDistribution.other ?? 0,
                      },
                  ]
                : [],
        [t, data?.propertiesDistribution]
    );

    const chartSeries = series.map((i) => i.value);

    const chartOptions = useChart({
        chart: {
            sparkline: {
                enabled: true,
            },
        },
        // colors,
        labels: series.map((i) => i.label),
        stroke: {
            colors: [theme.palette.background.paper],
        },
        legend: {
            floating: true,
            position: "bottom",
            horizontalAlign: "center",
        },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
        tooltip: {
            fillSeriesColor: false,
            y: {
                formatter: (value: number) => value.toString(),
                title: {
                    formatter: (seriesName: string) => `${seriesName}`,
                },
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: false,
                    },
                },
            },
        },
        // ...options,
    });

    return (
        <Card variant="outlined" sx={{ boxShadow: 5 }}>
            <CardHeader
                title={title}
                subheader={subheader}
                sx={{ my: 1, textAlign: "center" }}
            />

            <StyledChart
                dir="ltr"
                type="pie"
                series={chartSeries}
                options={chartOptions}
                width="100%"
                height={280}
            />
        </Card>
    );
}
