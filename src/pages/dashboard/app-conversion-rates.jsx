import PropTypes from "prop-types";
import { Box, Card, CardHeader } from "@mui/material";
import dynamic from "next/dynamic"; // Import 'next/dynamic'
import useChart from "src/components/chart/use-chart";

// Define the dynamic import for the Chart component
const DynamicChart = dynamic(() => import("src/components/chart/chart"), {
    ssr: false, // Disable server-side rendering for this component
});

export default function AppConversionRates({
    title,
    subheader,
    chart,
    ...other
}) {
    const { colors, series, options } = chart;

    const chartSeries = series.map((i) => i.value);

    const chartOptions = useChart({
        colors,
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (value) => value,
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
        ...options,
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />
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

AppConversionRates.propTypes = {
    chart: PropTypes.object,
    subheader: PropTypes.string,
    title: PropTypes.string,
};
