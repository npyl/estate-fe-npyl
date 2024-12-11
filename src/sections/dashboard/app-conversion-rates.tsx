import { Box, Card, CardHeader } from "@mui/material";
import { useGetDashboardQuery } from "@/services/dashboard";
import useChart from "@/components/chart/use-chart";
import Chart from "@/components/chart";

interface AppConversionRatesProps {
    title: string;
    subheader: string;
}

export default function AppConversionRates({
    title,
    subheader,
}: AppConversionRatesProps) {
    const { data } = useGetDashboardQuery();

    const series =
        data?.propertiesPerUserList?.map((e) => ({
            label: e.user,
            value: e.properties,
        })) || [];

    const chartSeries = series.map((i) => i.value);

    const chartOptions = useChart({
        // colors,
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (value) => value.toString(),
                title: {
                    formatter: (value: string) => `${value}`,
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
    });

    return (
        <Card variant="outlined" sx={{ boxShadow: 5 }}>
            <CardHeader
                title={title}
                subheader={subheader}
                sx={{
                    textAlign: "center",
                }}
            />
            <Box sx={{ mx: 3 }}>
                <Chart
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
