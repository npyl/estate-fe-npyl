import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import {
    selectFacade,
    selectLoadingDock,
    selectPanoramicView,
    selectVeranda,
    selectView,
    setFacade,
    setLoadingDock,
    setPanoramicView,
    setVeranda,
    setView,
} from "src/slices/property";

const FeaturesForOtherSection: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const panoramicView = useSelector(selectPanoramicView);
    const loadingDock = useSelector(selectLoadingDock);
    const view = useSelector(selectView);
    const facade = useSelector(selectFacade);
    const veranda = useSelector(selectVeranda);

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
                <Typography variant="h6">{t("Feautures")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={3}
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

                    {/* <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={alarmSystem}
                            checked={alarmSystem}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setAlarmSystem(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Alarm System" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Alarm System")}
                        </Typography>
                    </Grid> */}
                    <Grid
                        item
                        xs={3}
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
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={loadingDock}
                            checked={loadingDock}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setLoadingDock(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Loading Dock" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Loading Dock")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={veranda}
                            checked={veranda}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setVeranda(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Veranda" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Veranda")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={view}
                            checked={view}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setView(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "View" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("View")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default FeaturesForOtherSection;
