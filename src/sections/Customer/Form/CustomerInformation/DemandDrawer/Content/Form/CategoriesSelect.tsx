import { Divider, Grid } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";
import { useWatch } from "react-hook-form";
import MultiSelect from "./_shared/MultiSelect";
import { ICustomerYup } from "../../../../types";
import useDemandEnums from "./useDemandEnums";
import { filterName } from "./util";

interface Props {
    index: number;
}

const CategoriesSelect: FC<Props> = ({ index }) => {
    const { t } = useTranslation();

    const { propertyEnums, parentCategoryEnum } = useDemandEnums();

    const parentCategories = (useWatch<ICustomerYup>({
        name: filterName("parentCategories", index),
    }) || []) as string[];

    const subCategoriesMap: {
        [key: string]: KeyValue[];
    } = useMemo(
        () => ({
            RESIDENTIAL: propertyEnums?.residentialCategory || [],
            COMMERCIAL: propertyEnums?.commercialCategory || [],
            LAND: propertyEnums?.landCategory || [],
            OTHER: propertyEnums?.otherCategory || [],
        }),
        [propertyEnums]
    );

    if (parentCategories.length === 0) return null;

    return (
        <>
            <Divider />
            <Grid container spacing={1.5}>
                {parentCategories.map((e) => {
                    // Find the name (value) of the selected parent category using its key (e)
                    const pc = parentCategoryEnum.find(
                        (item) => item.key === e
                    )?.value;

                    const name = filterName("categories", index);

                    return (
                        <Grid key={pc} item xs={6}>
                            <MultiSelect
                                name={name}
                                label={`${t("Category")} (${pc})`}
                                options={subCategoriesMap[e]}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default CategoriesSelect;
