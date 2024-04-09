import * as React from "react";
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
import { useMemo } from "react";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Live as LiveIcon } from "@/icons/live";

const dataset = Array.from({ length: 24 }, (_, i) => ({
    london: Math.floor(Math.random() * 100000),
    hour: `${i}:00`,
}));

const totalViews = new Intl.NumberFormat().format(
    dataset.reduce((acc, { london }) => acc + london, 0)
);

const visibleHours = [
    "0:00",
    "3:00",
    "6:00",
    "9:00",
    "12:00",
    "15:00",
    "18:00",
    "21:00",
];

const today = new Date();
const currentDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

export default function ViewsChart() {
    return (
        <>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"flex-start"}
            >
                <Stack direction="column" spacing={-1.5}>
                    <Typography variant="body1" p={1} sx={{ top: 0, left: 0 }}>
                        {currentDate}
                    </Typography>
                    <Typography variant="body1" p={1} sx={{ top: 0, right: 0 }}>
                        {totalViews} Views of Properties
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
            </Stack>
            <Box p={1}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        height={300}
                        data={dataset}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="hour"
                            tickFormatter={(tick) =>
                                visibleHours.includes(tick) ? tick : ""
                            }
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="london"
                            fill="#3366FF"
                            barSize={55}
                            shape={<Rectangle radius={[5, 5, 0, 0]} />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}
