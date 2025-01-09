import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFCheckbox, RHFOnlyNumbers } from "src/components/hook-form";

const ConstructionForOtherSection = () => {
    const { t } = useTranslation();

    return (
        <Panel label={t("Construction")}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        separateThousands={false}
                        label={t("Year of Construction")}
                        name="construction.yearOfConstruction"
                    />
                </Grid>

                <Grid item xs={6}>
                    <RHFOnlyNumbers
                        fullWidth
                        separateThousands={false}
                        label={t("Pool Size")}
                        name="construction.poolSize"
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <RHFCheckbox
                        name={"construction.underConstruction"}
                        label={t("Under Construction")}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFCheckbox
                        name={"construction.internalStairs"}
                        label={t("Internal Stairs")}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFCheckbox
                        name={"construction.newlyBuilt"}
                        label={t("Newly Build")}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RHFCheckbox
                        name={"construction.incomplete"}
                        label={t("Incomplete")}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default ConstructionForOtherSection;
