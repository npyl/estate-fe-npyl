import {
    Stack,
    Paper,
    TextField,
    MenuItem,
    Typography,
    Container,
    Grid,
    SxProps,
    Theme,
} from "@mui/material";
import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalProperty } from "src/types/global";
import { Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { PPButton } from "@/components/styled";

//Here i use the images with width and height set to 80 for the create property form
const getIcons = (sx?: SxProps<Theme>): Record<string, ReactNode> => ({
    RESIDENTIAL: (
        <img
            src={"/static/categoryPhotos/home.webp"}
            alt="Home"
            style={{ width: 80, height: 80 }}
        />
    ),
    COMMERCIAL: (
        <img
            src={"/static/categoryPhotos/commercial.webp"}
            alt="Home"
            style={{ width: 80, height: 80 }}
        />
    ),
    LAND: (
        <img
            src={"/static/categoryPhotos/land.webp"}
            alt="Home"
            style={{ width: 80, height: 80 }}
        />
    ),
    OTHER: (
        <img
            src={"/static/categoryPhotos/more.webp"}
            alt="Home"
            style={{ width: 80, height: 80 }}
        />
    ),
});

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

    const handleParentCategorySelect = (key: string) => {
        setParentCategory(key);
        if (parentCategory === key) {
            return;
        } else setCategory(""); // Reset subcategory when parent category changes
    };

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

                <Grid
                    container
                    mr={1}
                    my={3}
                    spacing={1}
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                >
                    {parentCategoryEnum.map(({ key, value }) => (
                        <Grid key={key} item xs={1} sm={6} width={1} height={1}>
                            <PPButton
                                clicked={key === parentCategory}
                                onClick={() => handleParentCategorySelect(key)}
                            >
                                {getIcons()[key]}
                                <Typography mt={1}>{value}</Typography>
                            </PPButton>
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
                    disabled={category === "" || isLoading}
                >
                    {t("Save")}
                </LoadingButton>
            </Stack>
        </Container>
    );
}
