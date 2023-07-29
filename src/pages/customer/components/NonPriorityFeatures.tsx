import { Box, Grid, Paper, Typography } from "@mui/material";

import FeaturesSection from "./DemandForm/Features";
import FeaturesForCommercialSection from "./DemandForm/FeaturesForCommercial";
import FeaturesForLandSection from "./DemandForm/FeaturesForLand";
import FeaturesForOtherSection from "./DemandForm/FeaturesForOther";

import { useDispatch, useSelector } from "react-redux";
import {
    selectBuyer,
    selectDemand,
    selectLeaser,
    setNonPriorityFeature,
} from "src/slices/customer";
import { IDemandPOST } from "src/types/demand";
import { useTranslation } from "react-i18next";

const NonPriorityFeatures = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);
    const demand: IDemandPOST = useSelector(selectDemand);

    const parentCategory = demand.filters?.parentCategory;
    if (!parentCategory) return null;

    const handleChange = (key: string, checked: boolean) => {
        dispatch(setNonPriorityFeature({ key }));
    };

    return leaser || buyer ? (
        <Paper
            elevation={10}
            sx={{
                overflow: "auto",
                padding: 0.5,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">
                    {" "}
                    {t("Non-Priority Feautures")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    {parentCategory === "Residential" && (
                        <FeaturesSection
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Land" && (
                        <FeaturesForLandSection
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Commercial" && (
                        <FeaturesForCommercialSection
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                    {parentCategory === "Other" && (
                        <FeaturesForOtherSection
                            priorityFeaturesMode={false}
                            onChange={handleChange}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    ) : (
        <></>
    );
};
export default NonPriorityFeatures;
