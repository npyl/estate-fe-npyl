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

import OnlyNumbersWithDot from "./componentsFields/OnlyNumbersWithDot";

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
    ) => dispatch(setter(event.target.value));

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
                        <OnlyNumbersWithDot
                            label={t("Public Trasportation")}
                            value={publicTransportation?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setPublicTransportation, event)
                            }
                            adorValue="km"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersWithDot
                            label={t("Sea")}
                            value={sea?.toString() || ""}
                            onChange={(event) => handleChange(setSea, event)}
                            adorValue="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersWithDot
                            label={t("Schools")}
                            value={schools?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setSchools, event)
                            }
                            adorValue="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersWithDot
                            label={t("Supermarket")}
                            value={supermarket?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setSupermarket, event)
                            }
                            adorValue="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersWithDot
                            label={t("Cafe-Restaurant")}
                            value={cafeRestaurant?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setCafeRestaurant, event)
                            }
                            adorValue="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersWithDot
                            label={t("Hospital")}
                            value={hospital?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setHospital, event)
                            }
                            adorValue="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersWithDot
                            label={t("Airport")}
                            value={airport?.toString() || ""}
                            onChange={(event) =>
                                handleChange(setAirport, event)
                            }
                            adorValue="km"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default DistancesSection;
