import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Rectangle,
} from "recharts";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { Live as LiveIcon } from "@/icons/live";
import { SpaceBetween } from "@/components/styled";
import { useGetDailyViewsQuery } from "@/services/publicDashboard";

const today = new Date();
const currentDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

export default function ViewsChart() {
    const { data } = useGetDailyViewsQuery(undefined, {
        pollingInterval: 3000,
    });

    const chartData = useMemo(() => data?.views || [], [data]);

    return (
        <>
            <SpaceBetween alignItems={"flex-start"}>
                <Stack direction="column" spacing={-1.5}>
                    <Typography variant="body1" p={1} sx={{ top: 0, left: 0 }}>
                        {currentDate}
                    </Typography>
                    <Typography variant="body1" p={1} sx={{ top: 0, right: 0 }}>
                        {data?.totalViews ?? 0} Views of Properties
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    p={1}
                    sx={{
                        top: 0,
                        right: 0,
                        display: "flex",
                        alignItems: "justify-content",
                        color: "primary.main",
                    }}
                >
                    <LiveIcon />
                    <Box pl={1}>LIVE</Box>
                </Typography>
            </SpaceBetween>
            <Box p={1}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        height={300}
                        data={chartData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="hour"
                            tickFormatter={(tick) => {
                                // Assuming `tick` is a number representing the hour
                                const date = new Date();
                                date.setHours(tick);
                                return date.toLocaleString("en-US", {
                                    hour: "numeric",
                                    hour12: true,
                                });
                            }}
                        />
                        <YAxis dataKey="views" />
                        <Tooltip
                            content={({ payload }) => {
                                if (payload?.length) {
                                    return (
                                        <Box
                                            sx={{
                                                padding: "10px",
                                                border: "1px solid #ccc",
                                                borderRadius: "7px",
                                                backgroundColor: "neutral.200",
                                                justifyContent: "center",
                                                textAlign: "center",
                                            }}
                                        >
                                            <p>
                                                Time:
                                                {new Date(
                                                    payload[0].payload.hour *
                                                        1000 *
                                                        60 *
                                                        60
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                            <p>Views: {payload[0].value}</p>
                                        </Box>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Bar
                            dataKey="views"
                            fill="#3366FF"
                            barSize={30}
                            shape={<Rectangle radius={[10, 10, 0, 0]} />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}
