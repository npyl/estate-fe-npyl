import {
    Stack,
    Paper,
    TextField,
    MenuItem,
    Typography,
    Container,
    Grid,
    useTheme,
} from "@mui/material";

import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";

import { IGlobalProperty } from "src/types/global";

import { Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";
import { useCallback, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { PPButton } from "@/components/styled";

const icons: Record<string, string> = {
    RESIDENTIAL: "/static/categories/commercial.png",
    COMMERCIAL: "/static/categories/land.png",
    LAND: "/static/categories/other.png",
    OTHER: "/static/categories/residential.png",
};

interface IFormProps {
    isLoading: boolean;
    isError: boolean;
    performCreate: (parentCategory: string, category: string) => void;
}

export default function Form({
    isLoading,
    isError,
    performCreate,
}: IFormProps) {
    const { t } = useTranslation();

    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory || [];

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

    const handleSave = useCallback(
        () => performCreate(parentCategory, category),
        [parentCategory, category]
    );

    const handleCategorySelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedKey = event.target.value;
        const selectedItem = subCategoriesMap[parentCategory!]?.find(
            (item) => item.key === selectedKey
        );

        if (selectedItem) {
            setCategory(selectedItem.key);
        }
    };

    const theme = useTheme();
    const isDark = useMemo(() => theme.palette.mode === "dark", [theme]);

    return (
        <Container maxWidth="md">
            <Paper component={Stack} p={2}>
                <Typography variant="h5" gutterBottom>
                    {t("Create a new property")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t(
                        "Choose a parent category and category for your property"
                    )}
                </Typography>

                <Grid container m={1} my={3} gap={1} justifyContent="center">
                    {parentCategoryEnum.map(({ key, value }) => (
                        <Grid
                            item
                            component={PPButton}
                            key={key}
                            clicked={key === parentCategory}
                            onClick={() => setParentCategory(key)}
                            xs={5} // NOTE: 6 doesn't work.
                            width={1}
                            height={1}
                            direction="column"
                        >
                            <img
                                src={icons[key]}
                                style={{
                                    filter: isDark
                                        ? "brightness(0) saturate(100%) invert(41%) sepia(10%) saturate(1037%) hue-rotate(176deg) brightness(93%) contrast(88%)"
                                        : "brightness(0) saturate(100%) invert(0)",
                                }}
                            />

                            <Typography mt={1}>{value}</Typography>
                        </Grid>
                    ))}
                </Grid>

                <TextField
                    disabled={!parentCategory}
                    select
                    label={t("Category")}
                    value={category}
                    onChange={handleCategorySelect}
                >
                    {subCategoriesMap[parentCategory!]?.map(
                        ({ key, value }) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        )
                    ) || []}
                </TextField>
            </Paper>

            <Stack direction="row" justifyContent="center" marginTop={3}>
                <LoadingButton
                    loading={isLoading && !isError}
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={handleSave}
                >
                    {t("Save")}
                </LoadingButton>
            </Stack>
        </Container>
    );
}
