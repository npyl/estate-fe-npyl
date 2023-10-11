import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {
    selectCorner,
    selectFacade,
    selectPanoramicView,
    selectWithinCityPlan,
    selectWithinResidentialZone,
    setCorner,
    setFacade,
    setPanoramicView,
    setWithinCityPlan,
    setWithinResidentialZone,
} from "src/slices/property";
import { useTranslation } from "react-i18next";

const FeaturesForLandSection: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const panoramicView = useSelector(selectPanoramicView);
    const facade = useSelector(selectFacade);
    const corner = useSelector(selectCorner);
    const withinResidentialZone = useSelector(selectWithinResidentialZone);
    const withinCityPlan = useSelector(selectWithinCityPlan);

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6">{t("Features")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={panoramicView}
                            checked={panoramicView}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPanoramicView(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Panoramic View" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Panoramic View")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={corner}
                            checked={corner}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setCorner(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Corner" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Corner")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={facade}
                            checked={facade}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setFacade(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Facade" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Facade")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={withinCityPlan}
                            checked={withinCityPlan}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setWithinCityPlan(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Within City Plan" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Within City Plan")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={withinResidentialZone}
                            checked={withinResidentialZone}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setWithinResidentialZone(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Within Residential Zone",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Within Residential Zone")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default FeaturesForLandSection;
