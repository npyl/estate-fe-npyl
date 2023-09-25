import {
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
} from "@mui/material";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
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
    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const parentCategoryEnum = enums?.parentCategory;

    const category = useSelector(selectCategory);
    const parentCategory = useSelector(selectParentCategory);

    if (!enums || !parentCategoryEnum || parentCategoryEnum.length === 0)
        return null;

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = {
        Residential: enums.residentialCategory,
        Commercial: enums.commercialCategory,
        Land: enums.landCategory,
        Other: enums.otherCategory,
    };

    return (
        <Grid container spacing={1} paddingLeft={2} paddingTop={3}>
            <Grid
                component={Paper}
                padding={"8px 16px 16px 10px"}
                container
                spacing={1}
            >
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            {t("Parent Category")}
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            value={parentCategory}
                            label="Parent Category"
                            onChange={(e) => {
                                const selectedKey = e.target.value; // This should be the key, not the value
                                dispatch(setParentCategory(selectedKey));
                            }}
                        >
                            {parentCategoryEnum.map((parentCategory, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={parentCategory.key}
                                    >
                                        {parentCategory.value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        disabled={parentCategory === ""}
                        fullWidth
                        select
                        label={t("Category")}
                        value={category}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            const selectedKey = event.target.value;
                            const selectedItem = subCategoriesMap[
                                parentCategory
                            ]?.find((item) => item.key === selectedKey);
                            if (selectedItem) {
                                dispatch(setCategory(selectedItem.key));
                            }
                        }}
                    >
                        {subCategoriesMap[parentCategory]?.map(
                            (category, index) => (
                                <MenuItem key={index} value={category.key}>
                                    {category.value}
                                </MenuItem>
                            )
                        ) || <MenuItem></MenuItem>}
                    </TextField>
                </Grid>
            </Grid>

            <Grid
                padding={2}
                container
                alignItems="center"
                justifyContent="flex-end"
                spacing={1}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={performUpload}
                    >
                        {t("Create")}
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}
