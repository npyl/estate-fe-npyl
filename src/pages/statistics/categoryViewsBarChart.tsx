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
import { t } from "i18next";
import { Stack } from "@mui/system";
import { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { TTimeFrame } from "@/types/publicDashboard";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetPublicDashboardParentCategoriesQuery } from "@/services/publicDashboard";

export default function ViewsOfPropertiesChart() {
    const [timeframe, setTimeframe] = useState<TTimeFrame>("ALL_TIME");

    const { data: parentCategoriesGet } =
        useGetPublicDashboardParentCategoriesQuery({
            timeframe,
        });

    const renderLegendText = (value: string) => (
        <span style={{ color: "black" }}>{value}</span>
    );

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) =>
        setTimeframe(e.target.value as TTimeFrame);

    const chartData = useMemo(
        () =>
            parentCategoriesGet?.map(({ date, parentCategories }) => ({
                date,
                All: parentCategories.All ?? 0,
                parentCategory: parentCategories.parentCategory ?? 0,
                Commercial: parentCategories.COMMERCIAL ?? 0,
                Residential: parentCategories.RESIDENTIAL ?? 0,
                Land: parentCategories.LAND ?? 0,
                Other: parentCategories.OTHER ?? 0,
            })) || [],
        [parentCategoriesGet]
    );

    return (
        <>
            <Stack direction="row" spacing={2} p={1}>
                <Typography variant={"h5"}>Category Views</Typography>

                <Select value={timeframe} onChange={handleTimeframeSelect}>
                    <MenuItem value="ALL_TIME">{t("All Time")}</MenuItem>
                    <MenuItem value="MONTH">Monthly</MenuItem>
                    <MenuItem value="WEEK">Weekly</MenuItem>
                    <MenuItem value="YEAR">Yearly</MenuItem>
                    <MenuItem value="DAY">Dayly</MenuItem>
                    <MenuItem value="CUSTOM">Custom</MenuItem>
                </Select>
            </Stack>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={730} height={250} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        content={({ payload }) => {
                            if (payload?.length) {
                                return (
                                    <div
                                        style={{
                                            background: "#fff",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "7px",
                                            color: "black", // This will make the text color black
                                        }}
                                    >
                                        {payload.map((entry) => (
                                            <p
                                                key={entry.name}
                                                style={{ color: "black" }}
                                            >
                                                {entry.name}: {entry.value}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }

                            return null;
                        }}
                    />

                    <Legend
                        formatter={renderLegendText}
                        iconType="circle"
                        iconSize={10}
                        verticalAlign="top"
                        align="right"
                        layout="horizontal"
                    />

                    <Bar
                        barSize={25}
                        dataKey="Commercial"
                        fill={"#A25772"}
                        shape={<Rectangle radius={[10, 10, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Residential"
                        fill={"#7C93C3"}
                        shape={<Rectangle radius={[10, 10, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Land"
                        fill={"#9EB8D9"}
                        shape={<Rectangle radius={[10, 10, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Other"
                        fill={"#EEF5FF"}
                        shape={<Rectangle radius={[10, 10, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
