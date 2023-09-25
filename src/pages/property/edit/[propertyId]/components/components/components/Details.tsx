import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Grid, Paper, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { floor } from "lodash";
import {
    selectAccessibility,
    selectAirConditioning,
    selectArea,
    selectAvgUtils,
    selectBalconies,
    selectBasement,
    selectBathrooms,
    selectBedrooms,
    selectCovered,
    selectElectricityType,
    selectEnergyClass,
    selectFloor,
    selectFloorHeating,
    selectFloorType,
    selectFrameType,
    selectFurnished,
    selectGarden,
    selectHasAttic,
    selectHeatingSystem,
    selectHeatingType,
    selectKitchens,
    selectLayers,
    selectLivingRooms,
    selectNumOfWC,
    selectOrientation,
    selectPublicTransportation,
    selectSea,
    selectStoreroom,
    selectViewType,
    selectZoneType,
    setAccessibility,
    setAirConditioning,
    setAvgUtils,
    setBathrooms,
    setBedrooms,
    setElectricityType,
    setEnergyClass,
    setFloor,
    setFloorHeating,
    setFloorType,
    setFrameType,
    setFurnished,
    setHeatingSystem,
    setHeatingType,
    setKitchens,
    setLayers,
    setLivingRooms,
    setNumOfWC,
    setOrientation,
    setStoreroom,
    setViewType,
    setZoneType,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const ariaLabel = { "aria-label": "description" };

const DetailsSection: React.FC<any> = (props) => {
    const enums = props.enums as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const dispatch = useDispatch();

    const furnished = useSelector(selectFurnished);
    const orientation = useSelector(selectOrientation);
    const floorType = useSelector(selectFloorType);
    const viewType = useSelector(selectViewType);
    const frameType = useSelector(selectFrameType);
    const accessibility = useSelector(selectAccessibility);
    const energyClass = useSelector(selectEnergyClass);
    const zoneType = useSelector(selectZoneType);
    const electricityType = useSelector(selectElectricityType);
    const floors = useSelector(selectFloor);
    const kitchens = useSelector(selectKitchens);
    const layers = useSelector(selectLayers);
    const bathrooms = useSelector(selectBathrooms);
    const numOfWC = useSelector(selectNumOfWC);
    const livingRooms = useSelector(selectLivingRooms);
    const bedrooms = useSelector(selectBedrooms);
    const Storerooms = useSelector(selectStoreroom);
    const covered = useSelector(selectCovered);
    const avgUtils = useSelector(selectAvgUtils);
    const heatingType = useSelector(selectHeatingType);
    const heatingSystem = useSelector(selectHeatingSystem);
    const floorHeating = useSelector(selectFloorHeating);
    const airConditioning = useSelector(selectAirConditioning);
    // const parkingType = useSelector(selectParkingType);
    // const spots = useSelector(selectSpots);
    // const balconySide = useSelector(selectBalconySide);
    const area = useSelector(selectArea);
    // const plot = useSelector(selectPlot);
    const basement = useSelector(selectBasement);
    const hasAttic = useSelector(selectHasAttic);
    const garden = useSelector(selectGarden);
    const balconies = useSelector(selectBalconies);
    const Storeroom = useSelector(selectStoreroom);
    const publicTransportation = useSelector(selectPublicTransportation);
    const toSea = useSelector(selectSea);

    if (!details) return null;

    return (
        <div style={{ padding: 10, paddingTop: 0 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Basic Details</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={6}
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Furnishing"
                                                        value={furnished}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setFurnished(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.furnished?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Orientation"
                                                        value={orientation}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setOrientation(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.orientation?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Floor Type"
                                                        value={floorType}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setFloorType(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.floorType?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="View"
                                                        value={viewType}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setViewType(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.viewType?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Frame Type"
                                                        value={frameType}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setFrameType(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.frameType?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Accessibility"
                                                        value={accessibility}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setAccessibility(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.accessibility?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Energy Class"
                                                        value={energyClass}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setEnergyClass(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.energyClass?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Zone"
                                                        value={zoneType}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setZoneType(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.zoneType?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Electricity"
                                                        value={electricityType}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setElectricityType(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.electricityType?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Floors"
                                                        value={floor}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setFloor(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Kitchens"
                                                        value={kitchens}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setKitchens(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Layers"
                                                        value={layers}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setLayers(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Bathrooms"
                                                        value={bathrooms}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setBathrooms(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Bedrooms"
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        value={bedrooms}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setBedrooms(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Number of WC"
                                                        value={numOfWC}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setNumOfWC(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Living Rooms"
                                                        value={livingRooms}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setLivingRooms(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Store Rooms"
                                                        value={Storerooms}
                                                        placeholder="1,2,3..."
                                                        inputProps={ariaLabel}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setStoreroom(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    {/* <> */}
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-controlled"
                                                        label="Average Utils"
                                                        value={avgUtils}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setAvgUtils(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <InputAdornment position="end">
                                                                    €
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Heating</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={6}
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Type"
                                                        value={heatingType}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setHeatingType(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.heatingType?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="outlined-select-currency"
                                                        select
                                                        label="Heating System"
                                                        value={heatingSystem}
                                                        onChange={(
                                                            event: React.ChangeEvent<HTMLInputElement>
                                                        ) => {
                                                            dispatch(
                                                                setHeatingSystem(
                                                                    event.target
                                                                        .value
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        {details?.heatingSystem?.map(
                                                            ({
                                                                key,
                                                                value,
                                                            }) => (
                                                                <MenuItem
                                                                    key={key}
                                                                    value={key}
                                                                >
                                                                    {value}
                                                                </MenuItem>
                                                            )
                                                        )}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={1.5} left={2}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox />
                                                            }
                                                            label="Floor Heating"
                                                            value={floorHeating}
                                                            onChange={(
                                                                event: React.ChangeEvent<unknown>,
                                                                checked: boolean
                                                            ) => {
                                                                setFloorHeating(
                                                                    checked
                                                                );
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Grid>

                                                <Grid item xs={1} left={2}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox />
                                                            }
                                                            label="Air-Coditioning"
                                                            value={
                                                                airConditioning
                                                            }
                                                            onChange={(
                                                                event: React.ChangeEvent<unknown>,
                                                                checked: boolean
                                                            ) => {
                                                                dispatch(
                                                                    setAirConditioning(
                                                                        checked
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                    </FormGroup>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Parking</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={6}
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid container spacing={2}></Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Balconies</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={6}
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid container spacing={2}></Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Areas</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={6}
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid container spacing={2}></Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Distances</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Paper
                                            elevation={6}
                                            sx={{ padding: 2 }}
                                        >
                                            <Grid container spacing={2}></Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
export default DetailsSection;
