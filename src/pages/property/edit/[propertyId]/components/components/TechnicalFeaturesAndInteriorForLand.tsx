import { Grid, Paper, Box, TextField, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectCoverageFactor,
    selectFacadeLength,
    selectFloorToAreaRatio,
    setCoverageFactor,
    setFacadeLength,
    setFloorToAreaRatio,
    selectInclination,
    setInclination,
} from "src/slices/property";

const TechnicalFeaturesAndInteriorForLandSection: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const globals = useGlobals();
    const inclinationEnum = globals?.property?.details?.inclination;

    const floorToAreaRatio = useSelector(selectFloorToAreaRatio);
    const coverageFactor = useSelector(selectCoverageFactor);
    const facadeLength = useSelector(selectFacadeLength);
    const inclination = useSelector(selectInclination);

    const handleFloorToAreaRatioChange = (value: string) =>
        dispatch(setFloorToAreaRatio(value));
    const handleCoverageFactorChange = (value: string) =>
        dispatch(setCoverageFactor(value));
    const handleFacadeLengthChange = (value: string) =>
        dispatch(setFacadeLength(value));
    const handleInclinationChange = (value: string) =>
        dispatch(setInclination(value));

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
                    {t("Technical Features And Interior")}
                </Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label={t("Floor To Area Ratio")}
                            value={floorToAreaRatio}
                            onChange={(e) =>
                                handleFloorToAreaRatioChange(e.target.value)
                            }
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Coverage Factor")}
                            value={coverageFactor}
                            onChange={handleCoverageFactorChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Facade Length")}
                            value={facadeLength}
                            adornment="m"
                            onChange={handleFacadeLengthChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            select
                            label={t("Inclination")}
                            value={inclination}
                            onChange={(e) =>
                                handleInclinationChange(e.target.value)
                            }
                        >
                            {inclinationEnum?.map((inclination, index) => (
                                <MenuItem
                                    key={inclination.key}
                                    value={inclination.key}
                                >
                                    {inclination.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TechnicalFeaturesAndInteriorForLandSection;
