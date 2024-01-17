import { Grid, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
    selectAccessForDisable,
    selectAdaptingToTheGround,
    selectAlarmSystem,
    selectCctv,
    selectCorner,
    selectFacade,
    selectFireDetector,
    selectHas24HoursSecurity,
    selectIndependentHeatingPerRoom,
    selectInternet,
    selectOrganizedGarden,
    selectPool,
    selectQuietArea,
    selectSoundInsulation,
    selectVeranda,
    selectView,
    selectWalkableDistanceToBeach,
    setAccessForDisable,
    setAdaptingToTheGround,
    setCctv,
    setCorner,
    setFacade,
    setFireDetector,
    setHas24HoursSecurity,
    setIndependentHeatingPerRoom,
    setInternet,
    setOrganizedGarden,
    setPool,
    setQuietArea,
    setSoundInsulation,
    setVeranda,
    setView,
    setWalkableDistanceToBeach,
} from "src/slices/property";

const Features: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const accessForDisable = useSelector(selectAccessForDisable);
    const pool = useSelector(selectPool);
    const internet = useSelector(selectInternet);
    const quietArea = useSelector(selectQuietArea);
    const soundInsulation = useSelector(selectSoundInsulation);
    const has24HoursSecurity = useSelector(selectHas24HoursSecurity);
    const alarmSystem = useSelector(selectAlarmSystem);
    const cctv = useSelector(selectCctv);
    const fireDetector = useSelector(selectFireDetector);
    const walkableDistanceToBeach = useSelector(selectWalkableDistanceToBeach);

    const organizedGarden = useSelector(selectOrganizedGarden);
    const independentHeatingPerRoom = useSelector(
        selectIndependentHeatingPerRoom
    );
    const adaptingToTheGround = useSelector(selectAdaptingToTheGround);

    const view = useSelector(selectView);
    const facade = useSelector(selectFacade);
    const corner = useSelector(selectCorner);
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
                <Typography variant="h6">{t("Features")}</Typography>
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
                            value={organizedGarden}
                            checked={organizedGarden}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setOrganizedGarden(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Organized Garden" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Organized Garden")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={has24HoursSecurity}
                            checked={has24HoursSecurity}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setHas24HoursSecurity(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Has 24Hours Security",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Has 24 Hours Security")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={cctv}
                            checked={cctv}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setCctv(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "CCTV" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("CCTV")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={internet}
                            checked={internet}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setInternet(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Internet" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Internet")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={walkableDistanceToBeach}
                            checked={walkableDistanceToBeach}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setWalkableDistanceToBeach(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Walkable Distance to Beach",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Walkable Distance to Beach")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={fireDetector}
                            checked={fireDetector}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setFireDetector(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Fire Detector" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Fire Detector")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={quietArea}
                            checked={quietArea}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setQuietArea(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Quiet Area" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Quiet Area")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={soundInsulation}
                            checked={soundInsulation}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setSoundInsulation(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Sound Insulation" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Sound Insulation")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={accessForDisable}
                            checked={accessForDisable}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setAccessForDisable(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Access for Disable" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Access for Disable")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={independentHeatingPerRoom}
                            checked={independentHeatingPerRoom}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setIndependentHeatingPerRoom(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Indepent Heating Per Room",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Indepent Heating Per Room")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={adaptingToTheGround}
                            checked={adaptingToTheGround}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setAdaptingToTheGround(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{
                                "aria-label": "Adapting to the Ground",
                            }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Adapting to the Ground")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={pool}
                            checked={pool}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPool(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Pool" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Pool")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
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
                        xs={3}
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
                </Grid>
            </Grid>
        </Paper>
    );
};
export default Features;
