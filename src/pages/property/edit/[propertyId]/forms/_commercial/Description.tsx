import { Grid, MenuItem } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import {
    RHFCheckbox,
    RHFOnlyNumbers,
    RHFTextField,
    Select,
} from "src/components/hook-form";
import { useGlobals } from "src/hooks/useGlobals";
import { IGlobalPropertyDetails } from "src/types/global";

const Description: React.FC = () => {
    const { t } = useTranslation();

    const data = useGlobals();
    const details = data?.property?.details as IGlobalPropertyDetails;

    return (
        <Panel label={t("Property Description")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        label={t("Floor")}
                        name="details.floor"
                        options={details?.floors}
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
                        label={t("Number of WC")}
                        name="details.numOfWC"
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
                        label={t("Accessibility")}
                        name={"details.accessibility"}
                        options={details?.accessibility}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Land Use")}
                        name={"details.landUse"}
                        options={details?.landUse}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Zone")}
                        name="details.zoneType"
                        options={details?.zoneType}
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
