import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useMemo } from "react";
import { Typography } from "@mui/material";
import { Box, padding, Stack } from "@mui/system";

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

const chartSetting = {
    yAxis: [
        {
            label: "Views",
        },
    ],

    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-25px)",
        },
        padding: 1,
        paddingTop: 0,
    },
};

const today = new Date();
const currentDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
});

export default function ViewsChart() {
    const cached = useMemo(
        () => dataset.filter(({ hour }) => visibleHours.includes(hour)),
        []
    );

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
                <BarChart
                    dataset={cached}
                    xAxis={[
                        {
                            scaleType: "band",
                            dataKey: "hour",
                        },
                    ]}
                    series={[
                        {
                            dataKey: "london",
                            color: "#3366FF",
                        },
                    ]}
                    {...chartSetting}
                />
            </Box>
        </>
    );
}
