import { Checkbox, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Box } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";
import { useAllCustomersQuery } from "src/services/customers";
import {
    selectAgriculturalUse,
    selectCottage,
    selectDoctorsOffice,
    selectInvestment,
    selectProfessionalUse,
    selectRenovation,
    selectStudent,
    selectTouristRental,
    setInvestment,
} from "src/slices/property";

import { IGlobalProperty, IGlobalPropertyDetails } from "src/types/global";

import { useState } from "react";
import { useAllUsersQuery } from "src/services/user";
import { useAllGlobalsQuery } from "src/services/global";

const SuitableForForOtherSection: React.FC<any> = (props) => {
    const [rentalPeriodStart, setRentalPeriodStart] = useState<Date | null>(
        new Date()
    );

    const { data } = useAllGlobalsQuery();
    const enums: IGlobalProperty = data?.property as IGlobalProperty;
    const details = enums?.details as IGlobalPropertyDetails;
    const dispatch = useDispatch();

    const student = useSelector(selectStudent);

    const cottage = useSelector(selectCottage);
    const touristRental = useSelector(selectTouristRental);
    const investment = useSelector(selectInvestment);
    const doctorsOffice = useSelector(selectDoctorsOffice);
    const professionalUse = useSelector(selectProfessionalUse);
    const renovation = useSelector(selectRenovation);
    const agriculturalUse = useSelector(selectAgriculturalUse);

    // get list of owners & managers
    const { data: owners } = useAllCustomersQuery();
    const { data: managers } = useAllUsersQuery();
    if (!enums) return null;
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
                <Typography variant="h6">Suitable For</Typography>
            </Box>

            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={3}
                        flexDirection="row"
                        sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                        <Checkbox
                            value={investment}
                            checked={investment}
                            onChange={(
                                event: React.ChangeEvent<unknown>,
                                checked: boolean
                            ) => {
                                dispatch(setInvestment(checked));
                            }}
                            sx={{ cursor: "default" }}
                            color="primary"
                            inputProps={{ "aria-label": "Investment" }}
                        />
                        <Typography variant="body1" sx={{ ml: 0 }}>
                            Investment
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SuitableForForOtherSection;
