import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useAllGlobalsQuery } from "src/services/global";
import {
    selectAccessibility,
    selectAttic,
    selectBathrooms,
    selectBedrooms,
    selectElectricityType,
    selectEnergyClass,
    selectFloor,
    selectFloorApartment,
    selectFloorType,
    selectFrameType,
    selectFurnished,
    selectKitchens,
    selectLandUse,
    selectLayers,
    selectLivingRooms,
    selectNumOfWC,
    selectOrientation,
    selectPenthouse,
    selectPlayRoom,
    selectRooms,
    selectSea,
    selectViewType,
    selectZoneType,
    setAccessibility,
    setLandUse,
    setOrientation,
    setSea,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";
const ariaLabel = { "aria-label": "description" };
const PropertyDescriptionForLandSection: React.FC<any> = (props) => {
    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const sea = useSelector(selectSea);
    const furnished = useSelector(selectFurnished);
    const atttic = useSelector(selectAttic);
    const playroom = useSelector(selectPlayRoom);
    const floorApartment = useSelector(selectFloorApartment);
    const penthouse = useSelector(selectPenthouse);
    const landUse = useSelector(selectLandUse);
    const floorType = useSelector(selectFloorType);
    const viewType = useSelector(selectViewType);
    const frameType = useSelector(selectFrameType);
    const accessibility = useSelector(selectAccessibility);
    const energyClass = useSelector(selectEnergyClass);
    const zoneType = useSelector(selectZoneType);
    const electricityType = useSelector(selectElectricityType);

    const kitchens = useSelector(selectKitchens);
    const layers = useSelector(selectLayers);
    const bathrooms = useSelector(selectBathrooms);
    const numOfWC = useSelector(selectNumOfWC);
    const livingRooms = useSelector(selectLivingRooms);
    const bedrooms = useSelector(selectBedrooms);

    const rooms = useSelector(selectRooms);
    const orientation = useSelector(selectOrientation);
    const floor = useSelector(selectFloor);

    if (!details) return null;

    //set the values for BE
    const handleSeaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numericValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters from the input
        dispatch(setSea(numericValue));
    };
    const handleChange = (
        setter: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setter(event.target.value));

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
                            label={t("Orientation")}
                            value={orientation}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(setOrientation(event.target.value));
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
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
                            type="number"
                            label={t("Distance From Sea")}
                            value={sea}
                            onChange={(event) => handleChange(setSea, event)}
                            // onKeyPress={handleKeyPress}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        km
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PropertyDescriptionForLandSection;
