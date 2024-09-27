import { Box, Card, CardHeader } from "@mui/material";
import dynamic from "next/dynamic"; // Import 'next/dynamic'
import useChart from "src/components/chart/use-chart";

// Define the dynamic import for the Chart component
const DynamicChart = dynamic(() => import("src/components/chart/chart"), {
    ssr: false, // Disable server-side rendering for this component
});
interface ChartData {
    label: string;
    value: number;
}

interface AppConversionRatesProps {
    title: string;
    subheader: string;
    chart: {
        series: ChartData[];
        // colors: any | null;
        // options: any | null;
    };
}

export default function AppConversionRates({
    title,
    subheader,
    chart,
    ...other
}: AppConversionRatesProps) {
    const { series } = chart;

    const chartSeries = series.map((i) => i.value);

    const chartOptions = useChart({
        // colors,
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (value: number) => value,
                title: {
                    formatter: () => "",
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "28%",
                borderRadius: 2,
            },
        },
        xaxis: {
            categories: series.map((i) => i.label),
        },
        // ...options,
    });

    return (
        <Card sx={{ minHeight: 468 }} {...other}>
            <CardHeader
                title={title}
                subheader={subheader}
                sx={{
                    textAlign: "center",
                }}
            />
            <Box sx={{ mx: 3 }}>
                {/* Render the dynamic Chart component */}
                <DynamicChart
                    dir="ltr"
                    type="bar"
                    series={[{ data: chartSeries }]}
                    options={chartOptions}
                    width="100%"
                    height={364}
                />
            </Box>
        </Card>
    );
}
