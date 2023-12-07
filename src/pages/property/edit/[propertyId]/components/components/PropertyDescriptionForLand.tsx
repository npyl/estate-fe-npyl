import { Grid, MenuItem, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import OnlyNumbersInput from "src/components/OnlyNumbers";
import { useGlobals } from "src/hooks/useGlobals";
import {
    selectAccessibility,
    selectFrontage,
    selectLandUse,
    selectOrientation,
    selectSea,
    setAccessibility,
    setFrontage,
    setLandUse,
    setOrientation,
    setSea,
} from "src/slices/property";
import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

const PropertyDescriptionForLandSection: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const data = useGlobals();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const sea = useSelector(selectSea);
    const landUse = useSelector(selectLandUse) || "";
    const accessibility = useSelector(selectAccessibility) || "";
    const orientation = useSelector(selectOrientation) || "";

    const frontage = useSelector(selectFrontage);

    if (!details) return null;

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
                            select
                            label={t("Orientation")}
                            value={orientation}
                            onChange={(event) =>
                                handleChange(setOrientation, event)
                            }
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
                            select
                            label={t("Accessibility")}
                            value={accessibility}
                            onChange={(event) =>
                                handleChange(setAccessibility, event)
                            }
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
                            select
                            label={t("Land Use")}
                            value={landUse}
                            onChange={(event) =>
                                handleChange(setLandUse, event)
                            }
                        >
                            {details?.landUse?.map((landUse, index) => (
                                <MenuItem key={index} value={landUse.key}>
                                    {landUse.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            fullWidth
                            type="number"
                            label={t("Distance From Sea")}
                            value={sea}
                            adornment="km"
                            onChange={(value) => dispatch(setSea(value))}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <OnlyNumbersInput
                            type="number"
                            fullWidth
                            label={t("Frontage")}
                            value={frontage}
                            onChange={(v) => dispatch(setFrontage(v))}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PropertyDescriptionForLandSection;
