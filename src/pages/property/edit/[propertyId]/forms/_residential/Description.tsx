import { Divider, Grid } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, RHFOnlyNumbers, Select } from "src/components/hook-form";
import { useGlobals } from "src/hooks/useGlobals";

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(() => data?.property?.details, [data]);

    const enums = useMemo(
        () => ({
            orientation: details?.orientation || [],
            accessibility: details?.accessibility || [],
            landUse: details?.landUse || [],
            floors: details?.floors || [],
            zoneType: details?.zoneType || [],
            viewType: details?.viewType || [],
        }),
        [details]
    );

    return enums;
};

const Description: React.FC = () => {
    const { t } = useTranslation();
    const { floors, accessibility, landUse, zoneType, orientation, viewType } =
        useEnums();

    return (
        <Panel label={"Property Description"}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        label={t("Floor")}
                        name="details.floor"
                        options={floors}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Bedrooms")}
                        name="details.bedrooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Layers")}
                        name="details.layers"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Kitchens")}
                        name="details.kitchens"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Living Rooms")}
                        name="details.livingrooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Number of WC")}
                        name="details.wc"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Bathrooms")}
                        name="details.bathrooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("View")}
                        name="details.viewType"
                        options={viewType}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Accessibility")}
                        name={"details.accessibility"}
                        options={accessibility}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Land Use")}
                        name={"details.landUse"}
                        options={landUse}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Zone")}
                        name="details.zoneType"
                        options={zoneType}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Rooms")}
                        name="details.rooms"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Orientation")}
                        name="details.orientation"
                        options={orientation}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Frontage")}
                        name="details.frontage"
                        placeholder="1,2,3..."
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RHFCheckbox label={t("Attic")} name="details.attic" />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RHFCheckbox
                        name="details.playroom"
                        label={t("Playroom")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RHFCheckbox
                        name="details.storeroom"
                        label={t("Storeroom")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RHFCheckbox
                        name="details.penthouse"
                        label={t("Penthouse")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RHFCheckbox
                        name="details.floorApartment"
                        label={t("Floor Apartment")}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <RHFCheckbox
                        name="details.goldenVisa"
                        label={t("Golden Visa")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default Description;
