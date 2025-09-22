import { Grid } from "@mui/material";
import * as React from "react";
import LabelSection from "@/ui/Label/Section";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import {
    RHFCheckbox,
    RHFOnlyNumbers,
    RHFSwitch,
    Select,
} from "@/components/hook-form";
import { TranslationType } from "src/types/translation";
import Rent from "../../_general/Rent";
import useEnums from "./useEnums";
import CategorySelect from "./CategorySelect";
import RHFCode from "../../_general/RHFCode";
import RHFKeyCode from "../../_general/RHFKeyCode";
import OwnerSelect from "../../_shared/OwnerSelect";
import RHFManagerAutocomplete from "@/ui/Autocompletes/RHFManager";

const getCHECKBOXES = (t: TranslationType) => [
    { name: "debatablePrice", label: t("Debatable Price") },
    { name: "buildable", label: t("Buildable") },
    { name: "auction", label: t("Auction") },
    {
        name: "details.legalAndTechnicalControl",
        label: t("Legal and Technical Control"),
    },
    {
        name: "details.irrigation",
        label: t("Irrigation"),
    },
    {
        name: "details.waterSupply",
        label: t("Water Supply"),
    },
    {
        name: "details.electricitySupply",
        label: t("Electricity Supply"),
    },
    {
        name: "details.hasBuildingPermit",
        label: t("Building Permit"),
    },
    {
        name: "details.hasBuilding",
        label: t("Contains Building"),
    },
];

const Checkboxes = () => {
    const { t } = useTranslation();
    const CHECKBOXES = useMemo(() => getCHECKBOXES(t), [t]);

    return CHECKBOXES.map((c, i) => (
        <Grid key={c.name} item xs={12} sm={6} md={4} lg={3}>
            <RHFCheckbox {...c} />
        </Grid>
    ));
};

const StateSelect = () => {
    const { t } = useTranslation();
    const { stateEnum } = useEnums();

    return (
        <Select
            isEnum
            name="state"
            label={t("State") + " *"}
            options={stateEnum}
        />
    );
};

const BasicForLandSection: React.FC<any> = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { propertyId } = router.query;

    return (
        <Panel
            label={t("BasicSection")}
            endNode={<RHFSwitch name="exclusive" label={t("Exclusive")} />}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <RHFCode fullWidth name="code" label={t("Code") + " *"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CategorySelect />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFManagerAutocomplete name="managerId" />
                </Grid>

                <OwnerSelect />

                <Grid item xs={12} sm={6}>
                    <StateSelect />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="area"
                        label={t("Living Space")}
                        adornment="m²"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        name="plotArea"
                        label={t("Plot Size")}
                        adornment="m²"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Building Balance")}
                        name={"details.buildingBalance"}
                        adornment="m²"
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
                        name="estimatedRentPrice"
                        label={t("Estimated Rent Price")}
                        adornment="€"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        label={t("Plot Frontage")}
                        name={"details.plotFrontage"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFKeyCode name="keyCode" label={t("Key Code")} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        label={t("Total Construction")}
                        name={"details.totalConstruction"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        label={t("Permissible Building Height")}
                        name={"details.permissibleBuildingHeight"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        label={t("Permissible Floors")}
                        name={"details.permissibleFloors"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFOnlyNumbers
                        label={t("Setback Coefficient")}
                        name={"details.setbackCoefficient"}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LabelSection
                        variant="property"
                        resourceId={+propertyId!}
                    />
                </Grid>

                <Checkboxes />
            </Grid>

            <Rent />
        </Panel>
    );
};

export default BasicForLandSection;
