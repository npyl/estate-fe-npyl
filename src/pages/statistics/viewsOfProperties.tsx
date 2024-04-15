import {
    LineChart,
    Line,
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
import { t } from "i18next";
import { useMemo, useState } from "react";

export default function StackedAreas() {
    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [timeframe, setTimeframe] = useState<TTimeFrame>("ALL_TIME");

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const { data: parentCategoriesGet } =
        useGetPublicDashboardPropertyViewsQuery({
            parentCategory,
            category,
            timeframe,
        });

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

    const handleParentCategorySelect = (e: SelectChangeEvent<string>) => {
        setParentCategory(e.target.value);
        setCategory("");
    };

    const handleCategorySelect = (event: SelectChangeEvent<string>) => {
        const selectedKey = event.target.value;
        const selectedItem = subCategoriesMap[parentCategory!]?.find(
            (item) => item.key === selectedKey
        );

        if (selectedItem) {
            setCategory(selectedItem.key);
        }
    };

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) =>
        setTimeframe(e.target.value as TTimeFrame);

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

    const renderTooltipContent = (props: TooltipProps<number, string>) => {
        if (props.active && props.payload && props.payload.length) {
            const payload = props.payload[0];

            return (
                <div
                    style={{
                        backgroundColor: "#fff",
                        padding: "10px",
                        border: "1px solid #ccc",
                    }}
                >
                    <p style={{ color: "#000" }}>{payload.name}</p>
                    {payload.payload.parentCategory && (
                        <p style={{ color: "#000" }}>
                            {renderLegendText("parentCategory")}:{" "}
                            {payload.payload.parentCategory}
                        </p>
                    )}
                    {payload.payload.category && (
                        <p style={{ color: "#000" }}>
                            {renderLegendText("category")}:{" "}
                            {payload.payload.category}
                        </p>
                    )}
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <Stack direction="row" spacing={2} p={1}>
                <Typography variant={"h5"} p={1}>
                    {t("Views of Properties")}
                </Typography>
                <Stack direction="row" padding={1} spacing={2}>
                    <Select value={timeframe} onChange={handleTimeframeSelect}>
                        <MenuItem value="ALL_TIME">{t("All_Time")}</MenuItem>
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
                        disabled={!parentCategory} // Add this line
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
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <defs>
                        <filter
                            id="shadow"
                            x="-30%"
                            y="-30%"
                            width="160%"
                            height="160%"
                        >
                            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                            <feOffset dx="5" dy="5" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.5" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    {category && parentCategory ? (
                        <>
                            <YAxis dataKey="parentCategory" />
                            <YAxis dataKey="category" />
                        </>
                    ) : !category && !parentCategory ? (
                        <YAxis dataKey="All" />
                    ) : !category && parentCategory ? (
                        <YAxis dataKey="parentCategory" />
                    ) : null}
                    <Tooltip content={renderTooltipContent} />
                    <Legend
                        formatter={renderLegendText}
                        iconType="circle"
                        iconSize={10}
                        verticalAlign="top"
                        align="right"
                        layout="horizontal" //se periptwsh pou ta theloun katheta apla vazw vertical
                    />

                    {category && parentCategory ? (
                        <>
                            <Line
                                type="monotone"
                                dataKey="parentCategory"
                                stroke="#EB0F0F"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="category"
                                stroke="#2E42A5"
                                strokeWidth={2}
                                dot={false}
                            />
                        </>
                    ) : !category && !parentCategory ? (
                        <Line
                            type="monotone"
                            dataKey="All"
                            stroke="#2E42A5"
                            strokeWidth={2}
                            dot={false}
                        />
                    ) : !category && parentCategory ? (
                        <Line
                            type="monotone"
                            dataKey="parentCategory"
                            stroke="#2E42A5"
                            strokeWidth={2}
                            dot={false}
                        />
                    ) : null}
                    {
                        (console.log("category", category),
                        console.log("parentCategory", parentCategory))
                    }
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
