import { Grid, Paper, Box, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import {
    selectCoverageFactor,
    selectFacadeLength,
    selectFloorToAreaRatio,
    setCoverageFactor,
    setFacadeLength,
    setFloorToAreaRatio,
    setAlarmSystem,
    selectAlarmSystem,
} from "src/slices/property";

const TechnicalFeaturesAndInteriorForLandSection: React.FC<any> = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const floorToAreaRatio = useSelector(selectFloorToAreaRatio);
    const coverageFactor = useSelector(selectCoverageFactor);
    const facadeLength = useSelector(selectFacadeLength);
    const alarmSystem = useSelector(selectAlarmSystem);
    const handleFloorToAreaRatioChange = (value: string) =>
        dispatch(setFloorToAreaRatio(value));
    const handleCoverageFactorChange = (value: string) =>
        dispatch(setCoverageFactor(value));
    const handleFacadeLengthChange = (value: string) =>
        dispatch(setFacadeLength(value));

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
                        <OnlyNumbersInput
                            fullWidth
                            label={t("Floor To Area Ratio")}
                            value={floorToAreaRatio}
                            onChange={handleFloorToAreaRatioChange}
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
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TechnicalFeaturesAndInteriorForLandSection;
