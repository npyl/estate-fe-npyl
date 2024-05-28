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
import { useGlobals } from "@/hooks/useGlobals";
import { useGetPublicDashboardPropertyViewsQuery } from "@/services/publicDashboard";
import { IGlobalProperty } from "@/types/global";
import { KeyValue } from "@/types/KeyValue";
import { TTimeFrame } from "@/types/publicDashboard";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useResponsive } from "@/hooks/use-responsive";

export default function StackedAreas() {
    const { t } = useTranslation();

    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [timeframe, setTimeframe] = useState<TTimeFrame>("WEEK");

    // Fetch enums and data using hooks
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const { data: parentCategoriesGet } =
        useGetPublicDashboardPropertyViewsQuery({
            parentCategory,
            category,
            timeframe,
        });

    // Organize sub-categories by main category
    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: enums?.residentialCategory || [],
            COMMERCIAL: enums?.commercialCategory || [],
            LAND: enums?.landCategory || [],
            OTHER: enums?.otherCategory || [],
        }),
        [enums]
    );

    // Handlers for select changes
    const handleParentCategorySelect = (e: SelectChangeEvent<string>) => {
        setParentCategory(e.target.value);
        setCategory("");
    };

    const handleCategorySelect = (event: SelectChangeEvent<string>) => {
        const selectedKey = event.target.value;
        if (selectedKey === "") {
            setCategory("");
        } else {
            const selectedItem = subCategoriesMap[parentCategory!]?.find(
                (item) => item.key === selectedKey
            );

            if (selectedItem) {
                setCategory(selectedItem.key);
            }
        }
    };

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) =>
        setTimeframe(e.target.value as TTimeFrame);

    // Prepare chart data
    const chartData = useMemo(
        () =>
            parentCategoriesGet?.map(({ date, parentCategories }) => ({
                date,
                All: parentCategories.All ?? 0,
                parentCategory: parentCategories.parentCategory ?? 0,
                category: parentCategories.category ?? 0,
            })) || [],
        [parentCategoriesGet]
    );

    // Render text for legends based on selections
    const renderLegendText = (value: string) => {
        if (!parentCategory && !category) {
            return "All";
        }

        if (value === "parentCategory" && parentCategory) {
            const parentCategoryItem = parentCategoryEnum?.find(
                (item) => item.key === parentCategory
            );
            return parentCategoryItem ? parentCategoryItem.value : value;
        }

        if (value === "category" && category) {
            const categoryItem = subCategoriesMap[parentCategory!]?.find(
                (item) => item.key === category
            );
            return categoryItem ? categoryItem.value : value;
        }

        return value;
    };

    // Tooltip content formatting
    const renderTooltipContent = ({
        active,
        payload,
    }: TooltipProps<ValueType, NameType>) => {
        if (active && payload && payload.length) {
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
                        Property Views
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
                            <span
                                style={{ color: "#000" }}
                            >{`${renderLegendText(
                                (entry.name as string) || ""
                            )}: ${entry.value}`}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    // Date formatter for X-axis ticks
    const formatDateTick = (tickItem: string) => {
        const date = new Date(tickItem);
        return timeframe === "WEEK"
            ? date
                  .toLocaleDateString("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      month: "2-digit",
                  })
                  .replace(/,\s*/g, " ") // remove the comma and space
            : date.toLocaleDateString();
    };

    const formatYAxis = (tickItem: number) => {
        return tickItem > 999 ? `${tickItem / 1000}k` : tickItem.toString();
    };

    const belowSm = useResponsive("down", "sm");
    const belowMd = useResponsive("down", "md");

    return (
        <>
            {belowMd && !belowSm ? (
                <Stack direction="column" spacing={2} p={1}>
                    <Typography variant={"h5"} p={1}>
                        {t("Views of Properties")}
                    </Typography>
                    <Stack direction="row" padding={1} spacing={2}>
                        <Select
                            value={timeframe}
                            onChange={handleTimeframeSelect}
                        >
                            <MenuItem value="ALL_TIME">
                                {t("All_Time")}
                            </MenuItem>
                            <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                            <MenuItem value="WEEK">{t("Weekly")}</MenuItem>
                            <MenuItem value="YEAR">{t("Yearly")}</MenuItem>
                            <MenuItem value="DAY">{t("Daily")}</MenuItem>
                            <MenuItem value="CUSTOM">Custom</MenuItem>
                        </Select>
                        <Select
                            value={parentCategory}
                            onChange={handleParentCategorySelect}
                            displayEmpty
                        >
                            <MenuItem value="">{t("Parent Category")}</MenuItem>
                            {parentCategoryEnum?.map((item) => (
                                <MenuItem key={item.key} value={item.key}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={category}
                            onChange={handleCategorySelect}
                            displayEmpty
                            disabled={!parentCategory}
                        >
                            <MenuItem value="">{t("Category")}</MenuItem>
                            {subCategoriesMap[parentCategory!]?.map((item) => (
                                <MenuItem key={item.key} value={item.key}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Stack>
            ) : (
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                    p={1}
                >
                    <Typography variant={"h5"} p={1}>
                        {t("Views of Properties")}
                    </Typography>
                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        padding={1}
                        spacing={2}
                    >
                        <Select
                            value={timeframe}
                            onChange={handleTimeframeSelect}
                        >
                            <MenuItem value="ALL_TIME">
                                {t("All_Time")}
                            </MenuItem>
                            <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                            <MenuItem value="WEEK">{t("Weekly")}</MenuItem>
                            <MenuItem value="YEAR">{t("Yearly")}</MenuItem>
                            <MenuItem value="DAY">{t("Daily")}</MenuItem>
                            <MenuItem value="CUSTOM">Custom</MenuItem>
                        </Select>
                        <Select
                            value={parentCategory}
                            onChange={handleParentCategorySelect}
                            displayEmpty
                        >
                            <MenuItem value="">{t("Parent Category")}</MenuItem>
                            {parentCategoryEnum?.map((item) => (
                                <MenuItem key={item.key} value={item.key}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            value={category}
                            onChange={handleCategorySelect}
                            displayEmpty
                            disabled={!parentCategory}
                        >
                            <MenuItem value="">{t("Category")}</MenuItem>
                            {subCategoriesMap[parentCategory!]?.map((item) => (
                                <MenuItem key={item.key} value={item.key}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Select>
                    </Stack>
                </Stack>
            )}

            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData} margin={{ left: 30, right: 30 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDateTick}
                        padding={{ left: 30, right: 30 }}
                    />
                    {category && parentCategory ? (
                        <>
                            <YAxis
                                dataKey="parentCategory"
                                width={20}
                                tickFormatter={formatYAxis}
                            />
                            <YAxis dataKey="category" width={20} />
                        </>
                    ) : !category && !parentCategory ? (
                        <YAxis
                            dataKey="All"
                            width={20}
                            tickFormatter={formatYAxis}
                        />
                    ) : !category && parentCategory ? (
                        <YAxis
                            dataKey="parentCategory"
                            width={20}
                            tickFormatter={formatYAxis}
                        />
                    ) : null}
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
                    ) : !category && !parentCategory ? (
                        <Area
                            type="monotone"
                            dataKey="All"
                            stroke="#2E42A5"
                            fill="#2E42A5"
                            strokeWidth={2}
                            dot={false}
                            fillOpacity={0.15}
                        />
                    ) : !category && parentCategory ? (
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
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}
