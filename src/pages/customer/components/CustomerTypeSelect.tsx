import {
    Box,
    Grid,
    Checkbox,
    Typography,
} from "@mui/material";

import * as React from "react";

import {
    selectSeller, selectLessor, selectLeaser, selectBuyer,
    toggleSeller, toggleLessor, toggleLeaser, toggleBuyer
} from "src/slices/customer";

import { useSelector, useDispatch } from "react-redux";

const CustomerTypeSelect = () => {

    const dispatch = useDispatch();

    const seller = useSelector(selectSeller);
    const lessor = useSelector(selectLessor);
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                height: "100%",
                px: 1.5,
                py: 1.5,
                display: "flex",
            }}
            flexDirection={"column"}
        >
            <Grid item xs={12} padding={1}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Checkbox checked={seller} onClick={() => {
                            dispatch(toggleSeller(true));
                        }} />
                        <Typography variant="h6">Seller</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox checked={lessor} onClick={() => { dispatch(toggleLessor(true)); }} />
                        <Typography variant="h6">Lessor</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox checked={leaser} onClick={() => { dispatch(toggleLeaser(true)); }} />
                        <Typography variant="h6">Leaser</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox checked={buyer} onClick={() => { dispatch(toggleBuyer(true)); }} />
                        <Typography variant="h6">Buyer</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export default CustomerTypeSelect;
