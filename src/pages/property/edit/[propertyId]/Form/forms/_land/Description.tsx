import { Grid } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFOnlyNumbers, Select } from "src/components/hook-form";
import { useGlobals } from "src/hooks/useGlobals";

const useEnums = () => {
    const data = useGlobals();
    const details = useMemo(() => data?.property?.details, [data]);

    const { orientation, accessibility, landUse } = useMemo(
        () => ({
            orientation: details?.orientation || [],
            accessibility: details?.accessibility || [],
            landUse: details?.landUse || [],
        }),
        [details]
    );

    return { orientation, accessibility, landUse };
};

const PropertyDescriptionForLandSection: React.FC<any> = () => {
    const { t } = useTranslation();
    const { orientation, accessibility, landUse } = useEnums();

    return (
        <Panel label={t("Property Description")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Select
                        label={t("Orientation")}
                        name="details.orientation"
                        options={orientation}
                    />
                </Grid>

                <Grid item xs={6}>
                    <Select
                        label={t("Accessibility")}
                        name="details.accessibility"
                        options={accessibility}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Select
                        label={t("Land Use")}
                        name="details.landUse"
                        options={landUse}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Distance From Sea")}
                        name="distances.sea"
                        adornment="m"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        label={t("Frontage")}
                        name="details.frontage"
                        adornment="m"
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default PropertyDescriptionForLandSection;
