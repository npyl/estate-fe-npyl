import { Grid, Paper } from "@mui/material";
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
    selectNewlyBuilt,
    selectUnderConstruction,
    selectYearOfConstruction,
    setIncomplete,
    setInternalStairs,
    setNewlyBuilt,
    setUnderConstruction,
    setYearOfConstruction,
} from "src/slices/property";
import { useGlobals } from "src/hooks/useGlobals";
import { useTranslation } from "react-i18next";
import OnlyNumbersInput from "src/components/OnlyNumbers";

const ConstructionForOtherSection: React.FC<any> = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const data = useGlobals();

    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;

    const yearOfConstruction = useSelector(selectYearOfConstruction);
    const underConstruction = useSelector(selectUnderConstruction);
    const newlyBuilt = useSelector(selectNewlyBuilt);
    const incomplete = useSelector(selectIncomplete);
    const internalStairs = useSelector(selectInternalStairs);

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
                </Grid>
            </Grid>
        </Paper>
    );
};
export default ConstructionForOtherSection;
