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
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import { ViewsIcon } from "@/icons/views";
import { useResponsive } from "@/hooks/use-responsive";

export default function StackedAreas() {
    const { t } = useTranslation();

    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [timeframe, setTimeframe] = useState<TTimeFrame>("ALL_TIME");

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

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
            setCategory("");
        }
    };

    const handleTimeframeSelect = (e: SelectChangeEvent<TTimeFrame>) =>
        setTimeframe(e.target.value as TTimeFrame);

    const belowSm = useResponsive("down", "sm");
    const belowMd = useResponsive("down", "md");

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

    return (
        <>
            {belowMd && !belowSm ? (
                <Stack direction="column" spacing={1} p={1}>
                    <Typography variant={"h5"} p={1}>
                        {t("Popular Properties")}
                    </Typography>
                    <Stack direction="row" spacing={3} p={1}>
                        <Select
                            value={timeframe}
                            onChange={handleTimeframeSelect}
                        >
                            <MenuItem value="ALL_TIME">
                                {t("All_Time")}
                            </MenuItem>
                            <MenuItem value="MONTH">{t("Monthly")}</MenuItem>
                            <MenuItem value="WEEK">{"Weekly"}</MenuItem>
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
                            sx={{ marginLeft: "10px" }}
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
                        {t("Popular Properties")}
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
                            <MenuItem value="WEEK">{"Weekly"}</MenuItem>
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

            {belowSm ? (
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
                                direction="row"
                                top={belowSm ? 5 : 20}
                                right={2}
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    paddingLeft: 1,
                                    paddingRight: 1,
                                    borderRadius: 15,
                                }}
                            >
                                <ViewsIcon />
                                <Typography
                                    sx={{
                                        paddingLeft: "5px",
                                        color: "white",
                                    }}
                                >
                                    {(property as any).visitors}
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Grid container spacing={2} my={2}>
                    {filteredProperties?.map((property) => (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={4}
                            lg={3}
                            key={`${property.id}-${timeframe}`}
                            sx={{
                                position: "relative",
                                flex: belowSm ? "0 0 auto" : "1 0 auto", // Flex basis changes when belowSm
                                minWidth: belowSm ? "50%" : undefined, // 50% width for each item on small screens
                            }}
                        >
                            <PropertyCard
                                item={property}
                                selectedMarker={null}
                            />
                            <Stack
                                position="absolute"
                                direction="row"
                                top={20}
                                right={2}
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    paddingLeft: 1,
                                    paddingRight: 1,
                                    borderRadius: 15,
                                }}
                            >
                                <ViewsIcon />
                                <Typography
                                    sx={{
                                        paddingLeft: "5px",
                                        color: "white",
                                    }}
                                >
                                    {(property as any).visitors}
                                </Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
