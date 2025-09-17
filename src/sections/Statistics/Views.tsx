import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
    TooltipProps,
} from "recharts";
import { useGlobals } from "@/sections/useGlobals";
import { useGetPublicDashboardPropertyViewsQuery } from "@/services/publicDashboard";
import { IGlobalProperty } from "@/types/global";
import { KeyValue } from "@/types/KeyValue";
import { TTimeFrame } from "@/types/publicDashboard";
import { Stack, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import DateRangePicker from "./DateRangePicker";
import { format } from "date-fns";
import { TranslationType } from "@/types/translation";
import ParentCategorySelect from "@/ui/Pickers/ParentCategory";
import CategorySelect from "@/ui/Pickers/Category";

const useLegendRenderer = (
    parentCategory: string,
    category: string,
    parentCategoryEnum: KeyValue[]
) => {
    const { t } = useTranslation();

    return useCallback((value: string) => {
        if (!parentCategory && !category) {
            return t("All");
        }

        if (value === "parentCategory" && parentCategory) {
            const parentCategoryItem = parentCategoryEnum?.find(
                (item) => item.key === parentCategory
            );
            return parentCategoryItem ? parentCategoryItem.value : value;
        }

        if (value === "category" && category) {
            return t(category);
        }

        return value;
    }, []);
};

const renderTooltipContent =
    (t: TranslationType, renderLegendText: (s: string) => string) =>
    ({ active, payload }: TooltipProps<ValueType, NameType>) => {
        if (!active || !(payload && payload.length > 0)) return null;

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
                <p style={{ color: "#000", margin: 0, fontWeight: "bold" }}>
                    {t("Property Views")}
                </p>
                <hr style={{ borderColor: "grey" }} />
                {payload.map((entry) => (
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
                        <span style={{ color: "#000" }}>{`${renderLegendText(
                            (entry.name as string) || ""
                        )}: ${entry.value}`}</span>
                    </div>
                ))}
            </div>
        );
    };

interface CustomChartProps extends PropsWithChildren {
    timeframe: TTimeFrame;
    parentCategory: string;
    category: string;
    startDate: string;
    endDate: string;
}

const CustomChart: FC<CustomChartProps> = ({
    timeframe,
    parentCategory,
    category,
    startDate,
    endDate,
    children,
}) => {
    const { i18n } = useTranslation();

    const { data } = useGetPublicDashboardPropertyViewsQuery({
        parentCategory,
        category,
        timeframe,
        startDate: startDate ? format(new Date(startDate), "yyyy-MM-dd") : "",
        endDate: endDate ? format(new Date(endDate), "yyyy-MM-dd") : "",
    });

    // Prepare chart data
    const chartData = useMemo(
        () =>
            data?.map(({ date, parentCategories }) => ({
                date,
                All: parentCategories.All ?? 0,
                parentCategory: parentCategories.parentCategory ?? 0,
                category: parentCategories.category ?? 0,
            })) || [],
        [data]
    );

    const xAxisTicks = useMemo(() => {
        if (chartData.length <= 10) {
            return chartData.map((data) => data.date);
        }
        const interval = Math.floor(chartData.length / 10);
        return chartData
            .filter((_, index) => index % interval === 0)
            .map((data) => data.date);
    }, [chartData, i18n.language]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ left: 30, right: 30 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickFormatter={formatDateTick(timeframe, i18n.language)}
                    tickMargin={7}
                    ticks={xAxisTicks}
                />
                {children}
            </AreaChart>
        </ResponsiveContainer>
    );
};

interface Props {
    renderLegendText: (s: string) => string;
}

const CustomTooltip: FC<Props> = ({ renderLegendText }) => {
    const { t } = useTranslation();
    return <Tooltip content={renderTooltipContent(t, renderLegendText)} />;
};

const formatYAxis = (tickItem: number) => {
    return tickItem > 999 ? `${tickItem / 1000}k` : tickItem.toString();
};

const CustomLegend: FC<Props> = ({ renderLegendText }) => (
    <Legend
        formatter={renderLegendText}
        iconType="circle"
        iconSize={10}
        verticalAlign="top"
        align="right"
        layout="horizontal"
        wrapperStyle={{ paddingBottom: "20px" }}
    />
);

// Date formatter for X-axis ticks
const formatDateTick =
    (timeframe: string, locale: string) => (tickItem: string) => {
        const date = new Date(tickItem);
        let formattedDate;

        switch (timeframe) {
            case "WEEK":
                formattedDate = date
                    .toLocaleDateString(locale, {
                        weekday: "short",
                        day: "2-digit",
                        month: "2-digit",
                    })
                    .replace(/,\s*/g, " "); // remove the comma and space
                break;
            case "DAY":
                formattedDate = date.toLocaleDateString(locale, {
                    hour: "2-digit",
                    hour12: true,
                });
                break;
            case "MONTH":
                formattedDate = date.toLocaleDateString(locale, {
                    day: "2-digit",
                    month: "short",
                });
                break;
            default:
                formattedDate = date.toLocaleDateString(locale, {
                    year: "numeric",
                    month: "short",
                });
                break;
        }

        return formattedDate;
    };

const StackedAreas = () => {
    const { t } = useTranslation();

    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [timeframe, setTimeframe] = useState<TTimeFrame>("WEEK");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Fetch enums and data using hooks
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) =>
        setTimeframe(e.target.value as TTimeFrame);

    const renderLegendText = useLegendRenderer(
        parentCategory,
        category,
        parentCategoryEnum
    );

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} p={1}>
                <Typography variant={"h5"} p={1}>
                    {t("Views of Properties")}
                </Typography>
                <Stack direction="row" gap={1} p={1} flexWrap="wrap">
                    <Select value={timeframe} onChange={handleTimeframeSelect}>
                        <MenuItem value="ALL_TIME">{t("All_Time")}</MenuItem>
                        <MenuItem value="WEEK">{t("Weekly")}</MenuItem>
                        <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                        <MenuItem value="YEAR">{t("Yearly")}</MenuItem>
                        <MenuItem value="CUSTOM">{t("Custom")}</MenuItem>
                    </Select>

                    <ParentCategorySelect
                        value={parentCategory}
                        onChange={setParentCategory}
                    />

                    <CategorySelect
                        parentCategory={parentCategory}
                        value={category}
                        onChange={setCategory}
                    />

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

            <CustomChart
                category={category}
                parentCategory={parentCategory}
                timeframe={timeframe}
                startDate={startDate}
                endDate={endDate}
            >
                {category && parentCategory ? (
                    <>
                        <YAxis
                            dataKey="parentCategory"
                            width={20}
                            tickFormatter={formatYAxis}
                        />
                        <YAxis dataKey="category" width={20} />
                    </>
                ) : null}
                {!category && !parentCategory ? (
                    <YAxis
                        dataKey="All"
                        width={20}
                        tickFormatter={formatYAxis}
                    />
                ) : null}
                {!category && parentCategory ? (
                    <YAxis
                        dataKey="parentCategory"
                        width={20}
                        tickFormatter={formatYAxis}
                    />
                ) : null}
                <CustomTooltip renderLegendText={renderLegendText} />
                <CustomLegend renderLegendText={renderLegendText} />
                {category && parentCategory ? (
                    <>
                        <Area
                            type="monotone"
                            dataKey="parentCategory"
                            stroke="#2E42A5"
                            fill="#2E42A5"
                            strokeWidth={2}
                            dot={false}
                            fillOpacity={0.15}
                        />
                        <Area
                            type="monotone"
                            dataKey="category"
                            stroke="#EB0F0F"
                            fill="#EB0F0F"
                            strokeWidth={2}
                            dot={false}
                            fillOpacity={0.15}
                        />
                    </>
                ) : null}
                {!category && !parentCategory ? (
                    <Area
                        type="monotone"
                        dataKey="All"
                        stroke="#2E42A5"
                        fill="#2E42A5"
                        strokeWidth={2}
                        dot={false}
                        fillOpacity={0.15}
                    />
                ) : null}
                {!category && parentCategory ? (
                    <Area
                        type="monotone"
                        dataKey="parentCategory"
                        stroke="#2E42A5"
                        fill="#2E42A5"
                        strokeWidth={2}
                        dot={false}
                        fillOpacity={0.15}
                    />
                ) : null}
            </CustomChart>
        </>
    );
};

export default StackedAreas;
