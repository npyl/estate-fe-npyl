import {
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
import { Stack } from "@mui/system";
import { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { TTimeFrame } from "@/types/publicDashboard";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetPublicDashboardParentCategoriesQuery } from "@/services/publicDashboard";
import { useTranslation } from "react-i18next";
import { TranslationType } from "@/types/translation";

const renderLegendText = (value: string, t: TranslationType) => {
    return <span>{t(value)}</span>;
};

export default function ViewsOfPropertiesChart() {
    const { t } = useTranslation();

    const [timeframe, setTimeframe] = useState<TTimeFrame>("ALL_TIME");

    const { data: parentCategoriesGet } =
        useGetPublicDashboardParentCategoriesQuery({
            timeframe,
        });

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
                <Typography variant={"h5"}>{t("Category Views")}</Typography>

                <Select value={timeframe} onChange={handleTimeframeSelect}>
                    <MenuItem value="ALL_TIME">{t("All_Time")}</MenuItem>
                    <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                    <MenuItem value="WEEK">{t("Weekly")}</MenuItem>
                    <MenuItem value="YEAR">{t("Yearly")}</MenuItem>
                    <MenuItem value="DAY">{t("Daily")}</MenuItem>
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
                        formatter={(f) => renderLegendText(f, t)}
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
                        fill={"#6ba8ff"}
                        shape={<Rectangle radius={[10, 10, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
