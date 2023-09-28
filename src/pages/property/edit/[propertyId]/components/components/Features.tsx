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
    selectBarbeque,
    selectBright,
    selectCctv,
    selectCombinedKitchenAndDiningArea,
    selectCorner,
    selectDrilling,
    selectFacade,
    selectFireDetector,
    selectGuestroom,
    selectHas24HoursSecurity,
    selectHeatedPool,
    selectHomeCinema,
    selectIndependentHeatingPerRoom,
    selectIndoorPool,
    selectInternet,
    selectJacuzzi,
    selectMasonryFence,
    selectMountainView,
    selectNearBusRoute,
    selectOffice,
    selectOrganizedGarden,
    selectPanoramicView,
    selectPool,
    selectQuietArea,
    selectSeaFront,
    selectSeaView,
    selectSmartHome,
    selectSoundInsulation,
    selectTents,
    selectThermalInsulation,
    selectVeranda,
    selectView,
    selectWalkableDistanceToBeach,
    selectWell,
    setAccessForDisable,
    setAdaptingToTheGround,
    setBarbeque,
    setCctv,
    setCombinedKitchenAndDiningArea,
    setCorner,
    setDrilling,
    setFacade,
    setFireDetector,
    setGuestroom,
    setHas24HoursSecurity,
    setHeatedPool,
    setHomeCinema,
    setIndependentHeatingPerRoom,
    setIndoorPool,
    setInternet,
    setJacuzzi,
    setMasonryFence,
    setMountainView,
    setNearBusRoute,
    setOffice,
    setOrganizedGarden,
    setPanoramicView,
    setPool,
    setQuietArea,
    setSeaFront,
    setSeaView,
    setSmartHome,
    setSoundInsulation,
    setTents,
    setThermalInsulation,
    setVeranda,
    setView,
    setWalkableDistanceToBeach,
    setWell,
} from "src/slices/property";

const FeaturesSection: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const accessForDisable = useSelector(selectAccessForDisable);
    const pool = useSelector(selectPool);
    const office = useSelector(selectOffice);
    const internet = useSelector(selectInternet);
    const thermalInsulation = useSelector(selectThermalInsulation);
    const seaView = useSelector(selectSeaView);
    const guestroom = useSelector(selectGuestroom);
    const quietArea = useSelector(selectQuietArea);
    const bright = useSelector(selectBright);
    const soundInsulation = useSelector(selectSoundInsulation);
    const has24HoursSecurity = useSelector(selectHas24HoursSecurity);
    const alarmSystem = useSelector(selectAlarmSystem);
    const barbeque = useSelector(selectBarbeque);
    const cctv = useSelector(selectCctv);
    const combinedKitchenAndDiningArea = useSelector(
        selectCombinedKitchenAndDiningArea
    );
    const fireDetector = useSelector(selectFireDetector);
    const homeCinema = useSelector(selectHomeCinema);
    const jacuzzi = useSelector(selectJacuzzi);
    const nearBusRoute = useSelector(selectNearBusRoute);
    const panoramicView = useSelector(selectPanoramicView);
    const smartHome = useSelector(selectSmartHome);
    const walkableDistanceToBeach = useSelector(selectWalkableDistanceToBeach);
    const mountainView = useSelector(selectMountainView);
    const seaFront = useSelector(selectSeaFront);
    const heatedPool = useSelector(selectHeatedPool);
    const indoorPool = useSelector(selectIndoorPool);
    const organizedGarden = useSelector(selectOrganizedGarden);
    const well = useSelector(selectWell);
    const drilling = useSelector(selectDrilling);
    const masonryFence = useSelector(selectMasonryFence);
    const independentHeatingPerRoom = useSelector(
        selectIndependentHeatingPerRoom
    );
    const adaptingToTheGround = useSelector(selectAdaptingToTheGround);
    const view = useSelector(selectView);
    const facade = useSelector(selectFacade);
    const corner = useSelector(selectCorner);
    const veranda = useSelector(selectVeranda);
    const tents = useSelector(selectTents);

    interface ICheckboxItemProps {
        label: string;
        value: boolean;
        onChange: (event: React.ChangeEvent<unknown>, checked: boolean) => void;
    }

    const CheckboxItem = (props: ICheckboxItemProps) => {
        const { value, label, onChange } = props;

        return (
            <Grid
                item
                xs={3}
                flexDirection="row"
                sx={{ display: "inline-flex", alignItems: "center" }}
            >
                <Checkbox
                    value={value}
                    checked={value}
                    onChange={onChange}
                    sx={{ cursor: "default" }}
                    color="primary"
                    inputProps={{ "aria-label": "Panoramic View" }}
                />
                <Typography variant="body1" sx={{ ml: 0 }}>
                    {label}
                </Typography>
            </Grid>
        );
    };

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
                    <CheckboxItem
                        label={t("Panoramic View")}
                        value={panoramicView}
                        onChange={(event, checked) => {
                            dispatch(setPanoramicView(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Corner")}
                        value={corner}
                        onChange={(event, checked) => {
                            dispatch(setCorner(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Facade")}
                        value={facade}
                        onChange={(event, checked) => {
                            dispatch(setFacade(checked));
                        }}
                    />

                    <CheckboxItem
                        label={t("Organized Garden")}
                        value={organizedGarden}
                        onChange={(event, checked) => {
                            dispatch(setOrganizedGarden(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Drilling")}
                        value={drilling}
                        onChange={(event, checked) => {
                            dispatch(setDrilling(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Adapting to the Ground")}
                        value={adaptingToTheGround}
                        onChange={(event, checked) => {
                            dispatch(setAdaptingToTheGround(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Pool")}
                        value={pool}
                        onChange={(event, checked) => {
                            dispatch(setPool(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Barbeque")}
                        value={barbeque}
                        onChange={(event, checked) => {
                            dispatch(setBarbeque(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Sea View")}
                        value={seaView}
                        onChange={(event, checked) => {
                            dispatch(setSeaView(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Mountain View")}
                        value={mountainView}
                        onChange={(event, checked) => {
                            dispatch(setMountainView(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Sea Front")}
                        value={seaFront}
                        onChange={(event, checked) => {
                            dispatch(setSeaFront(checked));
                        }}
                    />

                    <CheckboxItem
                        label={t("Smart Home")}
                        value={smartHome}
                        onChange={(event, checked) => {
                            dispatch(setSmartHome(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Thermal Insulation")}
                        value={thermalInsulation}
                        onChange={(event, checked) => {
                            dispatch(setThermalInsulation(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Jacuzzi")}
                        value={jacuzzi}
                        onChange={(event, checked) => {
                            dispatch(setJacuzzi(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Internet")}
                        value={internet}
                        onChange={(event, checked) => {
                            dispatch(setInternet(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Walkable Distance to Beach")}
                        value={walkableDistanceToBeach}
                        onChange={(event, checked) => {
                            dispatch(setWalkableDistanceToBeach(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Quiet Area")}
                        value={quietArea}
                        onChange={(event, checked) => {
                            dispatch(setQuietArea(checked));
                        }}
                    />

                    <CheckboxItem
                        label={t("View")}
                        value={view}
                        onChange={(event, checked) => {
                            dispatch(setView(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Near Bus Route")}
                        value={nearBusRoute}
                        onChange={(event, checked) => {
                            dispatch(setNearBusRoute(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Guestroom")}
                        value={guestroom}
                        onChange={(event, checked) => {
                            dispatch(setGuestroom(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Office")}
                        value={office}
                        onChange={(event, checked) => {
                            dispatch(setOffice(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Home Cinema")}
                        value={homeCinema}
                        onChange={(event, checked) => {
                            dispatch(setHomeCinema(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Combined Kitchen and Dinning Area")}
                        value={combinedKitchenAndDiningArea}
                        onChange={(event, checked) => {
                            dispatch(setCombinedKitchenAndDiningArea(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Sound Insulation")}
                        value={soundInsulation}
                        onChange={(event, checked) => {
                            dispatch(setSoundInsulation(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Veranda")}
                        value={veranda}
                        onChange={(event, checked) => {
                            dispatch(setVeranda(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Well")}
                        value={well}
                        onChange={(event, checked) => {
                            dispatch(setWell(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Masonry Fence")}
                        value={masonryFence}
                        onChange={(event, checked) => {
                            dispatch(setMasonryFence(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Access for Disabled")}
                        value={accessForDisable}
                        onChange={(event, checked) => {
                            dispatch(setAccessForDisable(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Tents")}
                        value={tents}
                        onChange={(event, checked) => {
                            dispatch(setTents(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Heated Pool")}
                        value={heatedPool}
                        onChange={(event, checked) => {
                            dispatch(setHeatedPool(checked));
                        }}
                    />

                    <CheckboxItem
                        label={t("Has 24 Hours Security")}
                        value={has24HoursSecurity}
                        onChange={(event, checked) => {
                            dispatch(setHas24HoursSecurity(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("CCTV")}
                        value={cctv}
                        onChange={(event, checked) => {
                            dispatch(setCctv(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Fire Detector")}
                        value={fireDetector}
                        onChange={(event, checked) => {
                            dispatch(setFireDetector(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Independent Heating Per Room")}
                        value={independentHeatingPerRoom}
                        onChange={(event, checked) => {
                            dispatch(setIndependentHeatingPerRoom(checked));
                        }}
                    />
                    <CheckboxItem
                        label={t("Indoor Pool")}
                        value={indoorPool}
                        onChange={(event, checked) => {
                            dispatch(setIndoorPool(checked));
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};
export default FeaturesSection;
