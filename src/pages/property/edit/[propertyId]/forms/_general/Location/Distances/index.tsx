import { Grid } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFOnlyNumbers } from "src/components/hook-form";
import CalculateDistances from "./Calculate";

interface SectionProps {
    map?: google.maps.Map;
}

const DistancesSection: React.FC<SectionProps> = ({ map }) => {
    const { t } = useTranslation();

    return (
        <Panel
            label={t("Distances")}
            endNode={<CalculateDistances map={map} />}
        >
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Public Transportation")}
                        name="distances.publicTransport"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Sea")}
                        name="distances.sea"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Schools")}
                        name="distances.schools"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Supermarket")}
                        name="distances.supermarket"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Cafe-Restaurant")}
                        name="distances.cafeRestaurant"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Hospital")}
                        name="distances.hospital"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Airport")}
                        name="distances.airport"
                        acceptsDecimal
                        adornment="m"
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default DistancesSection;
