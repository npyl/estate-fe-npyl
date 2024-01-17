import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useSelector } from "react-redux";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useDispatch } from "react-redux";
import {
    selectIncomplete,
    selectInternalStairs,
    selectNeedsRenovation,
    selectNeoclassical,
    selectNewlyBuilt,
    selectPreserved,
    selectRenovated,
    selectTotalFloorNumber,
    selectUnderConstruction,
    selectYearOfConstruction,
    selectYearOfRenovation,
    setIncomplete,
    setInternalStairs,
    setNeedsRenovation,
    setNeoclassical,
    setNewlyBuilt,
    setPreserved,
    setRenovated,
    setTotalFloorNumber,
    setUnderConstruction,
    setYearOfConstruction,
    setYearOfRenovation,
} from "src/slices/property";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import OnlyNumbersInput from "src/components/OnlyNumbers";

const Construction: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const data = useGlobals();

    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const totalFloorNumber = useSelector(selectTotalFloorNumber) || "";

    const yearOfConstruction = useSelector(selectYearOfConstruction);
    const underConstruction = useSelector(selectUnderConstruction);
    const newlyBuilt = useSelector(selectNewlyBuilt);
    const incomplete = useSelector(selectIncomplete);
    const internalStairs = useSelector(selectInternalStairs);
    const neoclassical = useSelector(selectNeoclassical);
    const yearOfRenovation = useSelector(selectYearOfRenovation);
    const renovated = useSelector(selectRenovated);
    const needsRenovation = useSelector(selectNeedsRenovation);
    const preserved = useSelector(selectPreserved);

    if (!details || !details.heatingSystem || !details.heatingType) return null;

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
                <Typography variant="h6">{t("Construction")}</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Year of Construction")}
                            value={yearOfConstruction}
                            onChange={(value) =>
                                dispatch(setYearOfConstruction(value))
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Year of Renovation")}
                            value={yearOfRenovation}
                            onChange={(value) =>
                                dispatch(setYearOfRenovation(value))
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            id="outlined-select-currency"
                            select
                            label={t("Total Floor Number")}
                            value={totalFloorNumber}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                dispatch(
                                    setTotalFloorNumber(event.target.value)
                                );
                            }}
                            inputProps={{
                                style: {
                                    height: "8px",
                                },
                            }}
                        >
                            {[...Array(10)].map((_, index) => {
                                const value = String(index + 1); // Here we are converting number to string
                                return (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={underConstruction}
                            checked={underConstruction}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setUnderConstruction(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Under Construction" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Under Construction")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={renovated}
                            checked={renovated}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setRenovated(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Rrenovated" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Renovated")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={needsRenovation}
                            checked={needsRenovation}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setNeedsRenovation(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Needs Renivation" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Needs Renovation")}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={internalStairs}
                            checked={internalStairs}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setInternalStairs(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Internal stairs" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Internal Stairs")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={newlyBuilt}
                            checked={newlyBuilt}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setNewlyBuilt(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Newly Build" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Newly Build")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={incomplete}
                            checked={incomplete}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setIncomplete(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Incomplete" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Incomplete")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={neoclassical}
                            checked={neoclassical}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setNeoclassical(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Neoclassical" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Neoclassical")}
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={preserved}
                            checked={preserved}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setPreserved(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Preserved" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            {t("Preserved")}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default Construction;
