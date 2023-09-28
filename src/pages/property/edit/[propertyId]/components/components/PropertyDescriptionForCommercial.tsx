import { Checkbox, Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
    selectAccessibility,
    selectBathrooms,
    selectFloor,
    selectLandUse,
    selectLayers,
    selectNumOfWC,
    selectRooms,
    selectStoreroomBool,
    selectZoneType,
    setAccessibility,
    setBathrooms,
    setFloor,
    setLandUse,
    setLayers,
    setNumOfWC,
    setRooms,
    setZoneType,
    setStoreroomBool,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const PropertyDescriptionForCommercialSection: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const landUse = useSelector(selectLandUse);
    const accessibility = useSelector(selectAccessibility);
    const zoneType = useSelector(selectZoneType);

    const layers = useSelector(selectLayers);
    const bathrooms = useSelector(selectBathrooms);
    const numOfWC = useSelector(selectNumOfWC);
    const storeroomBool = useSelector(selectStoreroomBool);
    const rooms = useSelector(selectRooms);
    const floor = useSelector(selectFloor);

    if (!details) return null;

    //set the values for BE
    const handleLayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
        dispatch(setLayers(numericValue));
    };
    const handleNumOfWCChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
        dispatch(setNumOfWC(numericValue));
    };
    const handleBathroomsChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
        dispatch(setBathrooms(numericValue));
    };
    const handleRoomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
        dispatch(setRooms(numericValue));
    };
    //handle onlynumbers
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /[0-9]/;
        if (!regex.test(keyValue)) {
            event.preventDefault(); // Prevent entering non-numeric characters
        }
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
                <Typography variant="h6">
                    {t("Property Description")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Floor")}
                            value={floor}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setFloor(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
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
                        {/* <> */}
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Layers")}
                            value={layers}
                            placeholder="1,2,3..."
                            onChange={handleLayersChange}
                            onKeyPress={handleKeyPress}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Number of WC")}
                            value={numOfWC}
                            placeholder="1,2,3..."
                            onChange={handleNumOfWCChange}
                            onKeyPress={handleKeyPress}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-controlled"
                            label={t("Bathrooms")}
                            value={bathrooms}
                            placeholder="1,2,3..."
                            onChange={handleBathroomsChange}
                            onKeyPress={handleKeyPress}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Accessibility")}
                            value={accessibility}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setAccessibility(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
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
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
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
                            id="outlined-select-currency"
                            select
                            label={t("Zone")}
                            value={zoneType}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setZoneType(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
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
                            id="outlined-controlled"
                            label={t("Rooms")}
                            value={rooms}
                            placeholder="1,2,3..."
                            onChange={handleRoomsChange}
                            onKeyPress={handleKeyPress}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            id="outlined-controlled"
                            value={storeroomBool}
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
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PropertyDescriptionForCommercialSection;
