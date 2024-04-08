import { Grid } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, RHFOnlyNumbers, Select } from "src/components/hook-form";
import { useGlobals } from "src/hooks/useGlobals";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "src/types/translation";

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
        }),
        [details]
    );

    return enums;
};

const getFIELDS = (
    t: TranslationType,
    floors: KeyValue[],
    accessibility: KeyValue[],
    landUse: KeyValue[],
    zoneType: KeyValue[]
) => [
    <Select label={t("Floor")} name="details.floor" options={floors} />,
    <RHFOnlyNumbers
        fullWidth
        label={t("Layers")}
        name="details.layers"
        placeholder="1,2,3..."
    />,
    <RHFOnlyNumbers
        fullWidth
        label={t("Number of WC")}
        name="details.wc"
        placeholder="1,2,3..."
    />,
    <RHFOnlyNumbers
        fullWidth
        label={t("Bathrooms")}
        name="details.bathrooms"
        placeholder="1,2,3..."
    />,
    <Select
        label={t("Accessibility")}
        name={"details.accessibility"}
        options={accessibility}
    />,
    <Select label={t("Land Use")} name={"details.landUse"} options={landUse} />,
    <Select label={t("Zone")} name="details.zoneType" options={zoneType} />,
    <RHFOnlyNumbers
        fullWidth
        label={t("Rooms")}
        name="details.rooms"
        placeholder="1,2,3..."
    />,
];

const Description: React.FC = () => {
    const { t } = useTranslation();
    const { floors, accessibility, landUse, zoneType } = useEnums();

    const FEILDS = useMemo(
        () => getFIELDS(t, floors, accessibility, landUse, zoneType),
        [t, floors, accessibility, landUse, zoneType]
    );

    return (
        <Panel label={t("Property Description")}>
            <Grid container spacing={2}>
                {FEILDS.map((f, i) => (
                    <Grid key={i} item xs={12} sm={6}>
                        {f}
                    </Grid>
                ))}

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
