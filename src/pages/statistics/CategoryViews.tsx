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
    TooltipProps,
} from "recharts";
import { Stack, Box } from "@mui/material";
import { useMemo, useState } from "react";
import Typography from "@mui/material/Typography";
import { TTimeFrame } from "@/types/publicDashboard";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useGetPublicDashboardParentCategoriesQuery } from "@/services/publicDashboard";
import { useTranslation } from "react-i18next";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import DateRangePicker from "./DateRangePicker";
import { format } from "date-fns";
import useResponsive from "@/hooks/useResponsive";

const formatYAxis = (tickItem: number) => {
    return tickItem > 999 ? `${tickItem / 1000}k` : tickItem.toString();
};

export default function ViewsOfPropertiesChart() {
    const { t, i18n } = useTranslation();

    const [timeframe, setTimeframe] = useState<TTimeFrame>("WEEK");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data: parentCategoriesGet } =
        useGetPublicDashboardParentCategoriesQuery({
            timeframe,
            startDate: startDate
                ? format(new Date(startDate), "yyyy-MM-dd")
                : "",
            endDate: endDate ? format(new Date(endDate), "yyyy-MM-dd") : "",
        });

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) => {
        setTimeframe(e.target.value as TTimeFrame);
        if (e.target.value !== "CUSTOM") {
            setStartDate("");
            setEndDate("");
        }
    };

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

    const renderLegendText = (value: string) => {
        return <span>{t(value)}</span>;
    };

    const formatDateTick = (tickItem: string, locale: string) => {
        const date = new Date(tickItem);
        return timeframe === "WEEK"
            ? date
                  .toLocaleDateString(locale, {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                  })
                  .replace(/,\s*/g, " ") // remove the comma and space
            : date.toLocaleDateString();
    };

    const renderTooltipContent = ({
        active,
        payload,
        label,
    }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
            const totalViews = payload.reduce(
                (total, entry) => total + (entry.value as number),
                0
            );

            // Find the index of the current data point in the chart data
            const currentIndex = chartData.findIndex(
                (data) => data.date === label
            );
            let percentageChange = "";

            // If there is a previous data point
            if (currentIndex > 0) {
                // Calculate the total views of the previous data point
                const previousTotalViews = Object.values(
                    chartData[currentIndex - 1]
                )
                    .filter(
                        (value): value is number => typeof value === "number"
                    )
                    .reduce((total, value) => total + value, 0);

                // Calculate the percentage change
                const change = totalViews - previousTotalViews;
                percentageChange = Math.round(
                    (change / previousTotalViews) * 100
                ).toString();
            }

            return (
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "7px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                >
                    <div style={{ borderBottom: "1px solid #eee" }}>
                        <p
                            style={{
                                color: "#000",
                                margin: 0,
                                fontWeight: "bold",
                            }}
                        >
                            {new Date(label as string).toLocaleDateString()}
                        </p>
                        <p
                            style={{
                                color: "#000",
                                margin: 0,
                                marginBottom: "5px",
                            }}
                        >
                            {t("Total views")}: {totalViews}
                        </p>
                    </div>
                    <div style={{ borderBottom: "1px solid #eee" }}>
                        {payload.map((entry) => {
                            return (
                                <div
                                    key={entry.name}
                                    style={{
                                        color: entry.color,
                                        display: "flex",
                                        alignItems: "center",
                                        marginTop: "5px",
                                    }}
                                >
                                    <span
                                        style={{
                                            display: "inline-block",
                                            backgroundColor: entry.color,
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            marginRight: "5px",
                                        }}
                                    ></span>
                                    <span style={{ color: "#000" }}>{`${t(
                                        (entry.name as string) || ""
                                    )}: ${entry.value}`}</span>
                                </div>
                            );
                        })}
                    </div>

                    {percentageChange && (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "5px",
                                justifyContent: "left",
                            }}
                        >
                            {percentageChange.startsWith("-") ? (
                                <SouthRoundedIcon sx={{ color: "#d32f2f" }} />
                            ) : (
                                <NorthRoundedIcon sx={{ color: "#388e3c" }} />
                            )}
                            <span
                                style={{
                                    marginLeft: "5px",
                                    color: percentageChange.startsWith("-")
                                        ? "#d32f2f"
                                        : "#388e3c",
                                    fontWeight: "bold",
                                }}
                            >
                                {percentageChange}%
                            </span>
                        </div>
                    )}
                </div>
            );
        }
        return null;
    };

    const belowMd = useResponsive("down", "md");

    const xAxisTicks = useMemo(() => {
        if (chartData.length <= 10) {
            return chartData.map((data) => data.date);
        }
        const interval = Math.floor(chartData.length / 10);
        return chartData
            .filter((_, index) => index % interval === 0)
            .map((data) => data.date);
    }, [chartData]);

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} p={1}>
                <Typography variant={"h5"}>{t("Category Views")}</Typography>

                <Stack direction="row" gap={1} flexWrap="wrap">
                    <Select value={timeframe} onChange={handleTimeframeSelect}>
                        <MenuItem value="ALL_TIME">{t("All_Time")}</MenuItem>
                        <MenuItem value="WEEK">{t("Weekly")}</MenuItem>

                        <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                        <MenuItem value="YEAR">{t("Yearly")}</MenuItem>
                        <MenuItem value="CUSTOM">{t("Custom")}</MenuItem>
                    </Select>

                    {timeframe === "CUSTOM" ? (
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(s, e) => {
                                setStartDate(s);
                                setEndDate(e);
                            }}
                        />
                    ) : null}
                </Stack>
            </Stack>

            <ResponsiveContainer height={300}>
                <BarChart
                    data={chartData}
                    margin={{ right: 30, left: 30, bottom: 5 }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        visibility={belowMd ? "hidden" : "visible"}
                        dataKey="date"
                        tickFormatter={(tickItem) =>
                            formatDateTick(tickItem, i18n.language)
                        }
                        tickMargin={7}
                        ticks={xAxisTicks}
                        // interval={
                        //     timeframe === "WEEK"
                        //         ? 0
                        //         : timeframe === "MONTH"
                        //         ? 2
                        //         : 8
                        // }
                    />
                    <YAxis width={20} tickFormatter={formatYAxis} />
                    <Tooltip content={renderTooltipContent} />

                    <Legend
                        formatter={renderLegendText}
                        iconType="circle"
                        iconSize={10}
                        verticalAlign="top"
                        align="right"
                        layout="horizontal"
                        wrapperStyle={{ paddingBottom: "20px" }}
                    />

                    <Bar
                        barSize={25}
                        dataKey="Commercial"
                        fill="#A25772"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Residential"
                        fill="#7C93C3"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Land"
                        fill="#9EB8D9"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                    <Bar
                        barSize={25}
                        dataKey="Other"
                        fill="#6BA8FF"
                        shape={<Rectangle radius={[5, 5, 0, 0]} />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
