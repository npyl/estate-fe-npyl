import { Card, CardHeader, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import useChart from "@/components/chart/use-chart";
import Chart from "@/components/chart";

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

interface ChartData {
    label: string;
    value: number;
}
interface TotalPropertiesProps {
    title: string;
    subheader: string;
    chart: {
        series: ChartData[];
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
        <Card variant="outlined" sx={{ boxShadow: 5 }} {...other}>
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
