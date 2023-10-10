import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectPriorityFeatures } from "src/slices/customer";
import CheckboxItem from "./components/CheckboxItem";
import { IFeatureSectionProps } from "./types/FeatureSectionProps";

const FeaturesForOtherSection = (props: IFeatureSectionProps) => {
    const { index, onChange: handleChange } = props;

    const { t } = useTranslation();

    const features = useSelector(selectPriorityFeatures)[index];

    return (
        <Grid item xs={12} padding={1}>
            <Grid container spacing={2}>
                <CheckboxItem
                    label={t("Panoramic View")}
                    value={!!features?.panoramicView}
                    sliceKey={"panoramicView"}
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Alarm System")}
                    value={!!features?.alarmSystem}
                    sliceKey={"alarmSystem"}
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Facade")}
                    value={!!features?.facade}
                    sliceKey={"facade"}
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("Loading Dock")}
                    value={!!features?.loadingDock}
                    sliceKey={"loadingDock"}
                    onChange={handleChange}
                />

                <CheckboxItem
                    label={t("Veranda")}
                    value={!!features?.veranda}
                    sliceKey={"veranda"}
                    onChange={handleChange}
                />
                <CheckboxItem
                    label={t("View")}
                    value={!!features?.view}
                    sliceKey={"view"}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    );
};
export default FeaturesForOtherSection;
