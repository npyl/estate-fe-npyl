import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useMemo } from "react";

type TickParamsSelectorProps = {
    tickPlacement: "end" | "start" | "middle" | "extremities";
    tickLabelPlacement: "tick" | "middle";
    setTickPlacement: React.Dispatch<
        React.SetStateAction<"end" | "start" | "middle" | "extremities">
    >;
    setTickLabelPlacement: React.Dispatch<
        React.SetStateAction<"tick" | "middle">
    >;
};

const dataset = Array.from({ length: 24 }, (_, i) => ({
    london: Math.floor(Math.random() * 100000),
    hour: `${i}:00`,
}));

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
            transform: "translateX(-10px)",
        },
    },
};

export default function ViewsChart() {
    const cached = useMemo(
        () => dataset.filter(({ hour }) => visibleHours.includes(hour)),
        []
    );

    return (
        <>
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
                        label: "Property Views",
                    },
                ]}
                {...chartSetting}
            />
        </>
    );
}
