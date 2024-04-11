import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useGlobals } from "@/hooks/useGlobals";
import {
    useGetPublicDashboardPropertyViewsQuery,
    useGetPublicDashboardPopularPropertiesQuery,
} from "@/services/publicDashboard";
import { IGlobalProperty } from "@/types/global";
import { KeyValue } from "@/types/KeyValue";
import { TTimeFrame } from "@/types/publicDashboard";
import { Grid, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { t } from "i18next";
import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";

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

    const { data: properties } = useGetPublicDashboardPopularPropertiesQuery({
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

    const handleParentCategorySelect = (e: SelectChangeEvent<string>) =>
        setParentCategory(e.target.value);

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

    return (
        <>
            <Stack direction="row" spacing={2} p={1}>
                <Typography variant={"h5"} p={1}>
                    Popular Properties
                </Typography>
                <Stack direction="row" padding={1} spacing={2}>
                    <Select value={timeframe} onChange={handleTimeframeSelect}>
                        <MenuItem value="ALL_TIME">{t("All Time")}</MenuItem>
                        <MenuItem value="MONTH">Monthly</MenuItem>
                        <MenuItem value="WEEK">Weekly</MenuItem>
                        <MenuItem value="YEAR">Yearly</MenuItem>
                        <MenuItem value="DAY">Dayly</MenuItem>
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
            <Grid container spacing={2}>
                {properties
                    ?.filter(
                        (property) =>
                            property.parentCategory.key === parentCategory &&
                            property.category.key === category
                    )
                    .map((property, index) => (
                        <Grid item xs={12} md={6} lg={4} key={index}>
                            <PropertyCard
                                item={property}
                                selectedMarker={null}
                            />
                        </Grid>
                    ))}
            </Grid>
        </>
    );
}
