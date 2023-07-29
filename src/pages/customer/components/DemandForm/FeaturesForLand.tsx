import { Grid } from "@mui/material";
import CheckboxItem from "./components/CheckboxItem";
import * as React from "react";
import { useSelector } from "react-redux";
import {
    selectPriorityFeatures,
    selectNonPriorityFeatures,
    setPriorityFeature,
    setNonPriorityFeature,
    selectLeaser,
    selectBuyer,
} from "src/slices/customer";
import { IFeatureSectionProps } from "./types/FeatureSectionProps";
import { useTranslation } from "react-i18next";

const FeaturesForLandSection = (props: IFeatureSectionProps) => {
    const { priorityFeaturesMode, onChange: handleChange } = props;
    const { t } = useTranslation();
    const priorityFeatures = useSelector(selectPriorityFeatures);
    const nonPriorityFeatures = useSelector(selectNonPriorityFeatures);
    const features = priorityFeaturesMode
        ? priorityFeatures
        : nonPriorityFeatures;

    return (
        <Grid item xs={12} padding={1}>
            <Grid container spacing={2}>
                <CheckboxItem
                    label={t("Panoramic View")}
                    value={features.panoramicView}
                    sliceKey="panoramicView"
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Corner")}
                    value={features.corner}
                    sliceKey="corner"
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Facade")}
                    value={features.facade}
                    sliceKey="facade"
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Within City Plan")}
                    value={features.withinCityPlan}
                    sliceKey="withinCityPlan"
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Within Residential Zone")}
                    value={features.withinResidentialZone}
                    sliceKey="withinResidentialZone"
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
};
export default FeaturesForLandSection;
