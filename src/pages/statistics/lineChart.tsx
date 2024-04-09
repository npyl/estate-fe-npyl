import { useGlobals } from "@/hooks/useGlobals";
import { IGlobalProperty } from "@/types/global";
import { KeyValue } from "@/types/KeyValue";
import { Box, Menu, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { t } from "i18next";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const years = [
    new Date(1990, 0, 1),
    new Date(1991, 0, 1),
    new Date(1992, 0, 1),
    new Date(1993, 0, 1),
    new Date(1994, 0, 1),
    new Date(1995, 0, 1),
    new Date(1996, 0, 1),
    new Date(1997, 0, 1),
    new Date(1998, 0, 1),
    new Date(1999, 0, 1),
    new Date(2000, 0, 1),
    new Date(2001, 0, 1),
    new Date(2002, 0, 1),
    new Date(2003, 0, 1),
    new Date(2004, 0, 1),
    new Date(2005, 0, 1),
    new Date(2006, 0, 1),
    new Date(2007, 0, 1),
    new Date(2008, 0, 1),
    new Date(2009, 0, 1),
    new Date(2010, 0, 1),
    new Date(2011, 0, 1),
    new Date(2012, 0, 1),
    new Date(2013, 0, 1),
    new Date(2014, 0, 1),
    new Date(2015, 0, 1),
    new Date(2016, 0, 1),
    new Date(2017, 0, 1),
    new Date(2018, 0, 1),
];

const UKGDPperCapita = [
    26189, 25792.014, 25790.186, 26349.342, 27277.543, 27861.215, 28472.248,
    29259.764, 30077.385, 30932.537, 31946.037, 32660.441, 33271.3, 34232.426,
    34865.78, 35623.625, 36214.07, 36816.676, 36264.79, 34402.36, 34754.473,
    34971, 35185, 35618, 36436, 36941, 37334, 37782.83, 38058.086,
];

const GermanyGDPperCapita = [
    25391, 26769.96, 27385.055, 27250.701, 28140.057, 28868.945, 29349.982,
    30186.945, 31129.584, 32087.604, 33367.285, 34260.29, 34590.93, 34716.44,
    35528.715, 36205.574, 38014.137, 39752.207, 40715.434, 38962.938, 41109.582,
    43189, 43320, 43413, 43922, 44293, 44689, 45619.785, 46177.617,
];

const dataset = years.map((year, index) => ({
    year: year.getFullYear(),
    UK: UKGDPperCapita[index],
    Germany: GermanyGDPperCapita[index],
}));

const renderLegendText = (value: string) => value;

export default function StackedAreas() {
    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [timeframe, setTimeframe] = useState("monthly");

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

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

    const handleTimeframeSelect = (e: SelectChangeEvent<string>) => {
        setTimeframe(e.target.value);
    };

    return (
        <>
            <Stack direction="row" spacing={2} p={1}>
                <Typography variant={"h5"} p={1}>
                    Views of Properties
                </Typography>
                <Stack direction="row" padding={1} spacing={2}>
                    <Select value={timeframe} onChange={handleTimeframeSelect}>
                        <MenuItem value="monthly">{t("Monthly")}</MenuItem>
                        <MenuItem value="yearly">Yearly</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
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
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={dataset}
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
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                        formatter={renderLegendText}
                        iconType="circle"
                        iconSize={10}
                        verticalAlign="top"
                        align="right"
                        layout="horizontal" //se periptwsh pou ta theloun katheta apla vazw vertical
                    />
                    <Line
                        type="monotone"
                        dataKey="UK"
                        stroke="#2E42A5"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        type="monotone"
                        dataKey="Germany"
                        stroke="#EB0F0F"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
