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
    selectBathrooms,
    selectFloor,
    selectLandUse,
    selectLayers,
    selectOrientation,
    selectRooms,
    selectStoreroomBool,
    selectViewType,
    selectZoneType,
    setAccessibility,
    setBathrooms,
    setFloor,
    setLandUse,
    setLayers,
    setOrientation,
    setRooms,
    setStoreroomBool,
    setViewType,
    setZoneType,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const PropertyDescriptionForOtherSection: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const data = useGlobals();

    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const layers = useSelector(selectLayers);
    const bathrooms = useSelector(selectBathrooms);
    const storeroomBool = useSelector(selectStoreroomBool);
    const rooms = useSelector(selectRooms);

    const floor = useSelector(selectFloor) || "";
    const orientation = useSelector(selectOrientation) || "";
    const landUse = useSelector(selectLandUse) || "";
    const viewType = useSelector(selectViewType) || "";
    const accessibility = useSelector(selectAccessibility) || "";
    const zoneType = useSelector(selectZoneType) || "";

    if (!details) return null;

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
                <Typography variant="h6">
                    {t("Property Description")}
                </Typography>
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
                            fullWidth
                            label={t("Layers")}
                            value={layers}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setLayers(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Bathrooms")}
                            value={bathrooms}
                            placeholder="1,2,3..."
                            onChange={(value) => dispatch(setBathrooms(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Rooms")}
                            value={rooms}
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
                            id="outlined-select-currency"
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
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={storeroomBool}
                            checked={storeroomBool}
                            placeholder={t("Play Room") || ""}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setStoreroomBool(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Storeroom")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PropertyDescriptionForOtherSection;
