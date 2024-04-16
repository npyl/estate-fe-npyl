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

    const formatDateTick = (tickItem: string) => {
        const date = new Date(tickItem);
        return timeframe === "WEEK"
            ? date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
              })
            : date.toLocaleDateString();
    };

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
            <ResponsiveContainer width="99%" height={300}>
                <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient
                            id="colorCommercial"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#A25772"
                                stopOpacity={1}
                            />
                            <stop
                                offset="95%"
                                stopColor="#A25772"
                                stopOpacity={0.5}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorResidential"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#7C93C3"
                                stopOpacity={1}
                            />
                            <stop
                                offset="95%"
                                stopColor="#7C93C3"
                                stopOpacity={0.5}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorLand"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#9EB8D9"
                                stopOpacity={1}
                            />
                            <stop
                                offset="95%"
                                stopColor="#9EB8D9"
                                stopOpacity={0.5}
                            />
                        </linearGradient>
                        <linearGradient
                            id="colorOther"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#6ba8ff"
                                stopOpacity={1}
                            />
                            <stop
                                offset="95%"
                                stopColor="#6ba8ff"
                                stopOpacity={0.5}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickFormatter={formatDateTick} />
                    <YAxis width={20} />
                    {/* ... */}
                    <Bar
                        barSize={25}
                        dataKey="Commercial"
                        fill="url(#colorCommercial)"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Residential"
                        fill="url(#colorResidential)"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Land"
                        fill="url(#colorLand)"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Other"
                        fill="url(#colorOther)"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
