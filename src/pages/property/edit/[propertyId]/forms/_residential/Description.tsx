import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectAccessibility,
    selectHasAttic,
    selectBathrooms,
    selectBedrooms,
    selectFloor,
    selectKitchens,
    selectLandUse,
    selectLayers,
    selectLivingRooms,
    selectNumOfWC,
    selectOrientation,
    selectPenthouse,
    selectPlayRoom,
    selectRooms,
    selectStoreroomBool,
    selectViewType,
    selectZoneType,
    setAccessibility,
    setHasAttic,
    setBathrooms,
    setBedrooms,
    setFloor,
    setKitchens,
    setLandUse,
    setLayers,
    setLivingRooms,
    setNumOfWC,
    setOrientation,
    setPenthouse,
    setPlayRoom,
    setRooms,
    setStoreroomBool,
    setViewType,
    setZoneType,
    setFloorApartment,
    selectFloorApartment,
    selectFrontage,
    setFrontage,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const PropertyDescriptionSection: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const hasAttic = useSelector(selectHasAttic);
    const playroom = useSelector(selectPlayRoom);
    const penthouse = useSelector(selectPenthouse);
    const floorApartment = useSelector(selectFloorApartment);
    const kitchens = useSelector(selectKitchens);
    const layers = useSelector(selectLayers);
    const bathrooms = useSelector(selectBathrooms);
    const numOfWC = useSelector(selectNumOfWC);
    const livingRooms = useSelector(selectLivingRooms);
    const bedrooms = useSelector(selectBedrooms);
    const storeroomBool = useSelector(selectStoreroomBool);
    const rooms = useSelector(selectRooms);

    const landUse = useSelector(selectLandUse) || "";
    const viewType = useSelector(selectViewType) || "";
    const accessibility = useSelector(selectAccessibility) || "";
    const zoneType = useSelector(selectZoneType) || "";
    const orientation = useSelector(selectOrientation) || "";
    const floor = useSelector(selectFloor) || "";

    const frontage = useSelector(selectFrontage);

    if (!enums || !details) return null;

    return (
        <Paper elevation={10} sx={{ padding: 0.5, overflow: "auto" }}>
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "left",
                }}
            >
                <Typography variant="h6">{"Property Description"}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Floor")}
                            value={floor}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setFloor(event.target.value));
                            }}
                        >
                            {details?.floors?.map((floor, index) => (
                                <MenuItem key={index} value={floor.key}>
                                    {floor.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Bedrooms")}
                            placeholder="1,2,3..."
                            value={bedrooms}
                            onChange={(value) => dispatch(setBedrooms(value))}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Layers")}
                            value={layers}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setLayers(value))}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Kitchens")}
                            value={kitchens}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setKitchens(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Living Rooms")}
                            value={livingRooms}
                            placeholder="1,2,3..."
                            onChange={(value) =>
                                dispatch(setLivingRooms(value))
                            }
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Number of WC")}
                            value={numOfWC}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setNumOfWC(value))}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Bathrooms")}
                            value={bathrooms}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setBathrooms(value))}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("View")}
                            value={viewType}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setViewType(event.target.value));
                            }}
                        >
                            {details?.viewType?.map((viewType, index) => (
                                <MenuItem key={index} value={viewType.key}>
                                    {viewType.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Accessibility")}
                            value={accessibility}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setAccessibility(event.target.value));
                            }}
                        >
                            {details?.accessibility?.map(
                                (accessibility, index) => (
                                    <MenuItem
                                        key={index}
                                        value={accessibility.key}
                                    >
                                        {accessibility.value}
                                    </MenuItem>
                                )
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Land Use")}
                            value={landUse}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setLandUse(event.target.value));
                            }}
                        >
                            {details?.landUse?.map((landUse, index) => (
                                <MenuItem key={index} value={landUse.key}>
                                    {landUse.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Zone")}
                            value={zoneType}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setZoneType(event.target.value));
                            }}
                        >
                            {details?.zoneType?.map((zoneType, index) => (
                                <MenuItem key={index} value={zoneType.key}>
                                    {zoneType.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Rooms")}
                            value={rooms}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setRooms(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Orientation")}
                            value={orientation}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setOrientation(event.target.value));
                            }}
                        >
                            {details?.orientation?.map((orientation, index) => (
                                <MenuItem key={index} value={orientation.key}>
                                    {orientation.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Frontage")}
                            value={frontage}
                            onChange={(v) => dispatch(setFrontage(v))}
                        />
                    </Grid>

                    {/* Checkboxes */}
                    <Grid
                        item
                        xs={2.4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            id="outlined-controlled"
                            checked={hasAttic}
                            value={hasAttic}
                            placeholder="Attic"
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setHasAttic(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Elevator" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Attic")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2.4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            id="outlined-controlled"
                            checked={playroom}
                            value={playroom}
                            placeholder="Play Room"
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPlayRoom(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Elevator" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Playroom")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2.4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            id="outlined-controlled"
                            checked={storeroomBool}
                            value={storeroomBool}
                            placeholder="storer room"
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setStoreroomBool(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Elevator" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Storeroom")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={2.4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            id="outlined-controlled"
                            checked={penthouse}
                            value={penthouse}
                            placeholder="Penthouse"
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPenthouse(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Elevator" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Penthouse")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={2.4}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            id="outlined-controlled"
                            value={floorApartment}
                            checked={floorApartment}
                            placeholder="Floor Apartment"
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setFloorApartment(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Elevator" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Floor Apartment")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PropertyDescriptionSection;
