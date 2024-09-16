import { Grid } from "@mui/material";
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
        <Panel label={t("Property Description")}>
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
                        label={t("Layers")}
                        name="details.layers"
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
                    <Select
                        label={t("View")}
                        name="details.viewType"
                        options={viewType}
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
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Frontage")}
                        name="details.frontage"
                        placeholder="1,2,3..."
                    />
                </Grid>
                <Grid item xs={3}>
                    <RHFCheckbox
                        name="details.storeroom"
                        label={t("Storeroom")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default Description;
