import {
    Stack,
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Box,
    Button,
    SelectChangeEvent,
    Typography,
} from "@mui/material";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectCategory,
    selectParentCategory,
    setCategory,
    setParentCategory,
} from "src/slices/property";

import { IGlobalProperty } from "src/types/global";

import { Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";

interface IFormProps {
    performUpload?: () => void;
}

export default function Form({ performUpload }: IFormProps) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const category = useSelector(selectCategory) || "";
    const parentCategory = useSelector(selectParentCategory) || "";

    if (!enums || !parentCategoryEnum || parentCategoryEnum.length === 0)
        return null;

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = {
        RESIDENTIAL: enums.residentialCategory,
        COMMERCIAL: enums.commercialCategory,
        LAND: enums.landCategory,
        OTHER: enums.otherCategory,
    };

    const handleParentCategorySelect = (e: SelectChangeEvent<string>) => {
        const selectedKey = e.target.value;
        dispatch(setParentCategory(selectedKey));
    };

    const handleCategorySelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedKey = event.target.value;
        const selectedItem = subCategoriesMap[parentCategory!]?.find(
            (item) => item.key === selectedKey
        );
        if (selectedItem) {
            dispatch(setCategory(selectedItem.key));
        }
    };

    return (
        <Box
            borderRadius={12}
            sx={{
                padding: "24px",
                margin: "10px",
                marginTop: "1%",
                backgroundColor: "background.default",
                spacing: "3",
            }}
        >
            <Stack spacing={2} direction="column">
                <Grid
                    container
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                        xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography variant="h5" gutterBottom>
                            Create a New Property
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Choose a category and subcategory for your property.
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={8}
                        marginTop={5}
                        component={Paper}
                        elevation={18}
                        sx={{
                            padding: "24px",
                            borderRadius: "8px",
                            backgroundColor: "background.paper",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel>
                                        {t("Parent Category")}
                                    </InputLabel>
                                    <Select
                                        value={parentCategory}
                                        label="Parent Category"
                                        onChange={handleParentCategorySelect}
                                    >
                                        {parentCategoryEnum.map(
                                            (parentCategory, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        value={
                                                            parentCategory.key
                                                        }
                                                    >
                                                        {parentCategory.value}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    disabled={!parentCategory}
                                    fullWidth
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
                                    ) || <MenuItem />}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="center"
                        marginTop={3}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SendIcon />}
                            onClick={performUpload}
                            style={{
                                backgroundColor: "#4CAF50",
                                color: "white",
                                padding: "10px 20px",
                                fontSize: "16px",
                                borderRadius: "5px",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                            }}
                            onMouseOver={(e) => {
                                (
                                    e.target as HTMLElement
                                ).style.backgroundColor = "#45a049";
                            }}
                        >
                            {t("Create")}
                        </Button>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}
