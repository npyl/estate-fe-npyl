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
    SelectChangeEvent,
    Typography,
} from "@mui/material";

import * as React from "react";
import { useGlobals } from "src/hooks/useGlobals";

import { IGlobalProperty } from "src/types/global";

import { Send as SendIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";
import { useCallback, useMemo, useState } from "react";
import { SaveButton } from "../components/SaveButton";

interface IFormProps {
    isLoading: boolean;
    performCreate: (parentCategory: string, category: string) => void;
}

export default function Form({ isLoading, performCreate }: IFormProps) {
    const { t } = useTranslation();

    const [category, setCategory] = useState("");
    const [parentCategory, setParentCategory] = useState("");

    // enums
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: enums ? enums.residentialCategory : [],
            COMMERCIAL: enums ? enums.commercialCategory : [],
            LAND: enums ? enums.landCategory : [],
            OTHER: enums ? enums.otherCategory : [],
        }),
        [enums]
    );

    const handleSave = useCallback(
        () => performCreate(parentCategory, category),
        [parentCategory, category]
    );

    const handleParentCategorySelect = (e: SelectChangeEvent<string>) =>
        setParentCategory(e.target.value);

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
                            Choose a parent category and category for your
                            property.
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
                                        {parentCategoryEnum?.map(
                                            ({ key, value }, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={key}
                                                >
                                                    {value}
                                                </MenuItem>
                                            )
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
                                    )}
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
                        <SaveButton
                            loading={isLoading}
                            disabled={isLoading}
                            loadingPosition="start"
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={handleSave}
                        >
                            {t("Save")}
                        </SaveButton>
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    );
}
