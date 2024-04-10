import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import * as React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    Rectangle,
} from "recharts";

const data = [
    {
        name: "Page A",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
    {
        name: "Page B",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
    {
        name: "Page C",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
    {
        name: "Page D",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
    {
        name: "Page E",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
    {
        name: "Page F",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
    {
        name: "Page G",
        commercial: Math.floor(Math.random() * 5000),
        residential: Math.floor(Math.random() * 5000),
        land: Math.floor(Math.random() * 5000),
        other: Math.floor(Math.random() * 5000),
    },
];

const renderLegendText = (value: string) => (
    <span style={{ color: "black" }}>{value}</span>
);

export default function thelwnapethanw() {
    const [age, setAge] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };
    return (
        <>
            <Stack direction="row" spacing={2} p={1}>
                <Typography variant={"h5"}>Category Views</Typography>

                <Select
                    value={age}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem value="">Monthly</MenuItem>
                    <MenuItem value={20}>Weekly</MenuItem>
                </Select>
            </Stack>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        formatter={renderLegendText}
                        iconType="circle"
                        iconSize={10}
                        verticalAlign="top"
                        align="right"
                        layout="horizontal" //se periptwsh pou ta theloun katheta apla vazw vertical
                    />
                    <Bar
                        barSize={25}
                        dataKey="residential"
                        fill="#A25772"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="commercial"
                        fill="#7C93C3"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="land"
                        fill="#9EB8D9"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="other"
                        fill="#EEF5FF"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
