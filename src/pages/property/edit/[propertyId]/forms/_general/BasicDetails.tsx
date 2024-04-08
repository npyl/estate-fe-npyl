import { Grid, MenuItem } from "@mui/material";
import * as React from "react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LabelCreate } from "@/components/Label";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import { IGlobalProperty } from "src/types/global";
import { KeyValue } from "src/types/KeyValue";

import Panel from "src/components/Panel";

import {
    RHFSwitch,
    RHFOnlyNumbers,
    Select,
    RHFTextField,
    RHFCheckbox,
} from "src/components/hook-form";

import { useFormContext } from "react-hook-form";
import Autocomplete from "../components/Autocomplete";
import Rent from "./Rent";

const useEnums = () => {
    const data = useGlobals();

    const enums = useMemo(
        () => ({
            propertyEnums: data?.property as IGlobalProperty,
            stateEnum: data?.property?.state || [],
        }),
        [data]
    );

    return enums;
};

const BasicSection: React.FC<any> = () => {
    const router = useRouter();
    const { watch } = useFormContext();
    const { t } = useTranslation();
    const { propertyEnums, stateEnum } = useEnums();

    const { data: managers } = useAllUsersQuery();

    const { propertyId } = router.query;
    const parentCategory = watch("parentCategory") || "";

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

    const categories = useMemo(
        () => subCategoriesMap[parentCategory!] || [],
        [subCategoriesMap, parentCategory]
    );

    return (
        <Panel
            label={t("Basic Details").toString()}
            endNode={<RHFSwitch name="exclusive" label={t("Exclusive")} />} // TODO: iOS switch
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <RHFTextField
                        fullWidth
                        name="code"
                        label={t("Code") + " *"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        disabled={!parentCategory}
                        label={t("Category")}
                        name="category"
                        options={categories}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Manager")}
                        name="managerId"
                    >
                        <MenuItem value={undefined}>
                            {t(`Not selected`)}
                        </MenuItem>
                        {managers?.map(({ firstName, lastName, id }, i) => (
                            <MenuItem key={i} value={id}>
                                {`${firstName} ${lastName}`}
                            </MenuItem>
                        ))}
                    </RHFTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Autocomplete />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="area"
                        label={t("Area")}
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Select
                        name="state"
                        label={t("State") + " *"}
                        options={stateEnum}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="price"
                        label={t("Price")}
                        adornment="€"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="plotArea"
                        label={t("Plot Area")}
                        adornment="m²"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <LabelCreate variant="property" resourceId={+propertyId!} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        name="averageUtils"
                        label={t("Average Utils")}
                        adornment="€/Month"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="estimatedRentPrice"
                        label={t("Estimated Rent Price")}
                        adornment="€"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFTextField
                        fullWidth
                        name="keyCode"
                        label={t("Key Code")}
                    />
                </Grid>
            </Grid>

            <Rent />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <RHFCheckbox
                        name="debatablePrice"
                        label={t("Debatable Price")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFCheckbox name="auction" label={t("Auction")} />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default BasicSection;
