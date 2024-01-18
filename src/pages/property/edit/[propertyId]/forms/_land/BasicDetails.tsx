import { Grid, MenuItem } from "@mui/material";
import * as React from "react";
import { LabelCreate } from "src/components/label";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import { IGlobalProperty } from "src/types/global";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { KeyValue } from "src/types/KeyValue";
import Panel from "src/components/Panel";
import {
    RHFCheckbox,
    RHFDatePicker,
    RHFOnlyNumbers,
    RHFSwitch,
    RHFTextField,
    Select,
} from "src/components/hook-form";
import Autocomplete from "../components/Autocomplete";
import { TranslationType } from "src/types/translation";
import { useFormContext } from "react-hook-form";

const getCHECKBOXES = (t: TranslationType) => [
    { name: "rented", label: t("Rented") },
    { name: "debatablePrice", label: t("Debatable Price") },
    { name: "buildable", label: t("Buildable") },
    { name: "auction", label: t("Auction") },
    {
        name: "legalAndTechnicalControl",
        label: t("Legal and Technical Control"),
    },
    {
        name: "irrigation",
        label: t("Irrigation"),
    },
    {
        name: "waterSupply",
        label: t("Water Supply"),
    },
    {
        name: "hasBuildingPermit",
        label: t("Building Permit"),
    },
    {
        name: "hasBuilding",
        label: t("Contains Building"),
    },
];

const useEnums = () => {
    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const stateEnum = enums?.state || [];
    return { enums, stateEnum };
};

const BasicForLandSection: React.FC<any> = () => {
    const router = useRouter();
    const { watch } = useFormContext();
    const { t } = useTranslation();
    const { enums, stateEnum } = useEnums();
    const { data: managers } = useAllUsersQuery();

    const { propertyId } = router.query;
    const rented = watch("rented");
    const parentCategory = watch("parentCategory") || "";

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

    const categories = useMemo(
        () => subCategoriesMap[parentCategory!] || [],
        [subCategoriesMap, parentCategory]
    );

    const CHECKBOXES = useMemo(() => getCHECKBOXES(t), [t]);

    return (
        <Panel
            label={t("Basic Details")}
            endNode={<RHFSwitch name="exclusive" label={t("Exclusive")} />} // TODO: iOS switch
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFTextField fullWidth name="code" label={t("Code")} />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        disabled={!parentCategory}
                        label={t("Category")}
                        name="category"
                        options={categories}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete />
                </Grid>
                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        select
                        label={t("Manager")}
                        name="managerId"
                    >
                        <MenuItem value={""}>{t(`Not selected`)}</MenuItem>
                        {managers?.map(({ firstName, lastName, id }, i) => (
                            <MenuItem key={i} value={id}>
                                {`${firstName} ${lastName}`}
                            </MenuItem>
                        ))}
                    </RHFTextField>
                </Grid>

                <Grid item xs={6}>
                    <Select
                        name="state"
                        label={t("State")}
                        options={stateEnum}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="area"
                        label={t("Area")}
                        adornment="m²"
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="plotArea"
                        label={t("Plot Area")}
                        adornment="m²"
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="price"
                        label={t("Price")}
                        adornment="€"
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFTextField
                        fullWidth
                        name="keyCode"
                        label={t("Key Code")}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="estimatedRentPrice"
                        label={t("Estimated Rent Price")}
                        adornment="€"
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Plot Frontage")}
                        name={"details.plotFrontage"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Building Balance")}
                        name={"details.buildingBalance"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Total Construction")}
                        name={"details.totalConstruction"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Permissible Building Height")}
                        name={"details.permissibleBuildingHeight"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Permissible Floors")}
                        name={"details.permissibleFloors"}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        label={t("Setback Coefficient")}
                        name={"details.setbackCoefficient"}
                    />
                </Grid>

                <Grid item xs={6}>
                    <LabelCreate variant="property" resourceId={+propertyId!} />
                </Grid>

                {CHECKBOXES.map((c, i) => (
                    <Grid key={i} item xs={2}>
                        <RHFCheckbox {...c} />
                    </Grid>
                ))}

                <Grid item xs={12} padding={1}>
                    <Grid
                        container
                        spacing={0}
                        sx={{
                            padding: "10px",
                            border: "1px solid #000000",
                            borderRadius: "10px",
                        }}
                    >
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <RHFDatePicker
                                        name="availableAfter"
                                        label={t("Available After").toString()}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <RHFOnlyNumbers
                                        name="currentRentPrice"
                                        label={t("Current Rent Price")}
                                        adornment="€"
                                        disabled={!rented}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <RHFDatePicker
                                        name="rentalStart"
                                        label={t(
                                            "Rental Period Start"
                                        ).toString()}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <RHFDatePicker
                                        name="rentalEnd"
                                        label={t(
                                            "Rental Period End"
                                        ).toString()}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Panel>
    );
};

export default BasicForLandSection;
