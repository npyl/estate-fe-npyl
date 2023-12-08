import { Grid, Paper, Box, Typography } from "@mui/material";
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

import OnlyNumbersInput from "src/components/OnlyNumbers";

const DistancesSection: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const publicTransportation = useSelector(selectPublicTransportation);
    const schools = useSelector(selectSchools);
    const supermarket = useSelector(selectSupermarket);
    const cafeRestaurant = useSelector(selectCafeRestaurant);
    const hospital = useSelector(selectHospital);
    const airport = useSelector(selectAirport);
    const sea = useSelector(selectSea);

    const handleChange = (setter: any, v: number) => dispatch(setter(v));

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
                        <OnlyNumbersInput
                            label={t("Public Transportation")}
                            value={publicTransportation}
                            acceptsDecimal
                            onChange={(v) =>
                                handleChange(setPublicTransportation, v)
                            }
                            adornment="km"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Sea")}
                            value={sea}
                            acceptsDecimal
                            onChange={(v) => handleChange(setSea, v)}
                            adornment="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Schools")}
                            value={schools}
                            acceptsDecimal
                            onChange={(v) => handleChange(setSchools, v)}
                            adornment="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Supermarket")}
                            value={supermarket}
                            acceptsDecimal
                            onChange={(v) => handleChange(setSupermarket, v)}
                            adornment="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Cafe-Restaurant")}
                            value={cafeRestaurant}
                            acceptsDecimal
                            onChange={(v) => handleChange(setCafeRestaurant, v)}
                            adornment="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Hospital")}
                            value={hospital}
                            acceptsDecimal
                            onChange={(v) => handleChange(setHospital, v)}
                            adornment="km"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            label={t("Airport")}
                            value={airport}
                            acceptsDecimal
                            onChange={(v) => handleChange(setAirport, v)}
                            adornment="km"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default DistancesSection;
