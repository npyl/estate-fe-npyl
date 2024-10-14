import { useGlobals } from "@/hooks/useGlobals";
import { useGetPublicDashboardPopularPropertiesQuery } from "@/services/publicDashboard";
import { IGlobalProperty } from "@/types/global";
import { KeyValue } from "@/types/KeyValue";
import { TTimeFrame } from "@/types/publicDashboard";
import {
    Stack,
    Box,
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Skeleton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import PropertyCard from "@/components/Cards/PropertyCard";
import useResponsive from "@/hooks/useResponsive";
import { format } from "date-fns";
import LabelComponent from "../dashboard/LabelComponent";
import DateRangePicker from "./DateRangePicker";

export default function StackedAreas() {
    const { t } = useTranslation();

    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [timeframe, setTimeframe] = useState<TTimeFrame>("WEEK");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const { data: properties, isFetching } =
        useGetPublicDashboardPopularPropertiesQuery({
            parentCategory,
            category,
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

    const handleParentCategorySelect = (event: SelectChangeEvent<string>) => {
        const selectedParentCategory = event.target.value;
        setParentCategory(selectedParentCategory);
        setCategory("");
    };

    const handleCategorySelect = (event: SelectChangeEvent<string>) => {
        const selectedKey = event.target.value;
        const selectedItem = subCategoriesMap[parentCategory!]?.find(
            (item) => item.key === selectedKey
        );

        if (selectedItem) {
            setCategory(selectedItem.key);
        } else if (parentCategory && selectedKey === "") {
            setCategory(""); //check
        }
    };

    const belowSm = useResponsive("down", "sm");

    const filteredProperties = useMemo(
        () =>
            properties?.filter(
                (property) =>
                    (!parentCategory ||
                        property?.parentCategory?.key === parentCategory) &&
                    (!category || property?.category?.key === category)
            ),
        [parentCategory, category, properties]
    );

    const getViewLabel = () => {
        switch (timeframe) {
            case "ALL_TIME":
                return t("All Time Views");
            case "MONTH":
                return t("Monthly Views");
            case "WEEK":
                return t("Weekly Views");
            case "YEAR":
                return t("Yearly Views");
            case "DAY":
                return t("Daily Views");
            case "CUSTOM":
                return t("Custom Views");
            default:
                return "";
        }
    };

    return (
        <>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} p={1}>
                <Typography variant={"h5"} p={1}>
                    {t("Popular Properties")}
                </Typography>
                <Stack direction="row" gap={1} p={1} flexWrap="wrap">
                    <Select value={timeframe} onChange={handleTimeframeSelect}>
                        <MenuItem value="ALL_TIME">{t("All_Time")}</MenuItem>
                        <MenuItem value="DAY">{t("Daily")}</MenuItem>
                        <MenuItem value="WEEK">{t("Weekly")}</MenuItem>

                        <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                        <MenuItem value="YEAR">{t("Yearly")}</MenuItem>

                        <MenuItem value="CUSTOM">{t("Custom")}</MenuItem>
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

            {belowSm ? (
                isFetching ? (
                    <Stack px={2} direction="row" spacing={2} overflow="auto">
                        {[...Array(1)].map((_, i) => (
                            <Skeleton
                                key={i}
                                variant="rectangular"
                                animation="wave"
                                width={300}
                                height={200}
                                sx={{ borderRadius: 2 }}
                            />
                        ))}
                    </Stack>
                ) : (
                    <Stack px={2} direction="row" spacing={2} overflow="auto">
                        {filteredProperties?.map((property) => (
                            <Box
                                flex={1}
                                key={`${property.id}-${timeframe}`}
                                sx={{
                                    position: "relative",
                                }}
                                width={1}
                                height={1}
                            >
                                <PropertyCard
                                    item={property}
                                    selectedMarker={null}
                                />
                                <Stack
                                    position="absolute"
                                    direction="column"
                                    top={5}
                                    right={2}
                                    sx={{
                                        paddingLeft: 1,
                                        paddingRight: 1,
                                        borderRadius: 15,
                                    }}
                                >
                                    <LabelComponent
                                        text={`${t("Total Views")}: ${
                                            (property as any).visitors ?? 0
                                        }`}
                                    />
                                    {timeframe !== "ALL_TIME" && (
                                        <LabelComponent
                                            text={`${getViewLabel()}: ${
                                                (property as any).views ?? 0
                                            }`}
                                        />
                                    )}
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )
            ) : isFetching ? (
                <Grid container spacing={2} my={2}>
                    {[...Array(12)].map((_, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                animation="wave"
                                height={330}
                                sx={{ borderRadius: 2 }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={2} my={2}>
                    {filteredProperties?.map((property) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={`${property.id}-${timeframe}`}
                            sx={{
                                position: "relative",
                                flex: belowSm ? "0 0 auto" : "1 0 auto",
                                minWidth: belowSm ? "50%" : undefined,
                            }}
                        >
                            <PropertyCard
                                item={property}
                                selectedMarker={null}
                            />
                            <Stack
                                position="absolute"
                                direction="column"
                                top={20}
                                right={2}
                                sx={{
                                    paddingLeft: 1,
                                    paddingRight: 1,
                                    borderRadius: 15,
                                }}
                            >
                                <LabelComponent
                                    text={`${t("Total Views")}: ${
                                        (property as any).visitors ?? 0
                                    }`}
                                />
                                {timeframe !== "ALL_TIME" && (
                                    <LabelComponent
                                        text={`${getViewLabel()}: ${
                                            (property as any).views ?? 0
                                        }`}
                                    />
                                )}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
