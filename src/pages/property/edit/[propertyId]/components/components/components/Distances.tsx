import {
    Grid,
    Paper,
    TextField,
    Box,
    Typography,
    InputAdornment,
} from "@mui/material";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    selectAirport,
    selectCafeRestaurant,
    selectHospital,
    selectPublicTransportation,
    selectSchools,
    selectSea,
    selectSupermarket,
    setAirport,
    setCafeRestaurant,
    setHospital,
    setPublicTransportation,
    setSchools,
    setSea,
    setSupermarket,
} from "src/slices/property";
import { useTranslation } from "react-i18next";

const DistancesSection: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const publicTransportation = useSelector(selectPublicTransportation);
    const schools = useSelector(selectSchools);
    const supermarket = useSelector(selectSupermarket);
    const cafeRestaurant = useSelector(selectCafeRestaurant);
    const hospital = useSelector(selectHospital);
    const airport = useSelector(selectAirport);
    const sea = useSelector(selectSea);
    const handleChange = (
        setter: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        dispatch(setter(event.target.value));
    };

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
                <Typography variant="h6">{t("Distances")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Public Transportation")}
                            value={publicTransportation}
                            onChange={(event) =>
                                handleChange(setPublicTransportation, event)
                            }
                            onKeyPress={(event) => {
                                if (event.key === "-") {
                                    event.preventDefault();
                                }
                            }}
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
                                min: 0,
                            }}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Sea")}
                            value={sea}
                            onChange={(event) => handleChange(setSea, event)}
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
                                min: 0,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Schools")}
                            value={schools}
                            onChange={(event) =>
                                handleChange(setSchools, event)
                            }
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
                                min: 0,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Supermarket")}
                            value={supermarket}
                            onChange={(event) =>
                                handleChange(setSupermarket, event)
                            }
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
                                min: 0,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Cafe-Restaurant")}
                            value={cafeRestaurant}
                            onChange={(event) =>
                                handleChange(setCafeRestaurant, event)
                            }
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
                                min: 0,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Hospital")}
                            value={hospital}
                            onChange={(event) =>
                                handleChange(setHospital, event)
                            }
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
                                min: 0,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            type="number"
                            fullWidth
                            id="outlined-controlled"
                            label={t("Airport")}
                            value={airport}
                            onChange={(event) =>
                                handleChange(setAirport, event)
                            }
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
                                min: 0,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default DistancesSection;
