import { Checkbox, Grid, InputAdornment } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFTextField } from "src/components/hook-form";

// ROI = [(Current Rent Price or Estimated Rent Price *12) / Price]*100 (Μόνο στο sale)

const ROISelect: React.FC = () => {
    const { t } = useTranslation();

    const [checkbox1Enabled, setCheckbox1] = useState(false);
    const [checkbox2Enabled, setCheckbox2] = useState(false);

    return (
        <Panel label={t("ROI")}>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <RHFTextField
                        fullWidth
                        label={t("Price")}
                        name="price"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    €
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <RHFTextField
                        fullWidth
                        label={t("ROI")}
                        name="roi"
                        disabled
                    />
                </Grid>
                <Grid item xs={5}>
                    <RHFTextField
                        fullWidth
                        label={t("Current Rent Price")}
                        name="currentRentPrice"
                        disabled={!checkbox1Enabled}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    €
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={1}
                    flexDirection="row"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                >
                    <Checkbox
                        checked={checkbox1Enabled}
                        onChange={(e, c) => setCheckbox1(c)}
                    />
                    <Typography variant="body1" sx={{ ml: 0 }}></Typography>
                </Grid>
                <Grid item xs={5}>
                    <RHFTextField
                        fullWidth
                        label={t("Estimated Rent Price")}
                        name="estimatedRentPrice"
                        disabled={!checkbox2Enabled}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    €
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid
                    item
                    xs={1}
                    flexDirection="row"
                    sx={{ display: "inline-flex", alignItems: "center" }}
                >
                    <Checkbox
                        checked={checkbox2Enabled}
                        onChange={(e, c) => setCheckbox2(c)}
                    />
                    <Typography variant="body1" sx={{ ml: 0 }}></Typography>
                </Grid>
            </Grid>
        </Panel>
    );
};

export default ROISelect;
