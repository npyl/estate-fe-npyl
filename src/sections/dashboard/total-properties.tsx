import { Card, CardHeader, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic"; // Import 'next/dynamic'
import useChart from "src/components/chart/use-chart";

// Define the dynamic import for the Chart component
const DynamicChart = dynamic(() => import("src/components/chart/chart"), {
    ssr: false, // Disable server-side rendering for this component
});

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

const StyledChart = styled(DynamicChart)(({ theme }) => ({
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

interface ChartData {
    label: string;
    value: number;
}
interface TotalPropertiesProps {
    title: string;
    subheader: string;
    chart: {
        series: ChartData[];
        // colors: any | null;
        // options: any | null;
    };
}

export default function TotalProperties({
    title,
    subheader,
    chart,
    ...other
}: TotalPropertiesProps) {
    const theme = useTheme();

    const { series } = chart;

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
                formatter: (value: number) => value,
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
        <Card {...other}>
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
