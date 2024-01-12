import { Box, Grid, Checkbox, Typography } from "@mui/material";

import * as React from "react";

import {
    selectSeller,
    selectLessor,
    selectLeaser,
    selectBuyer,
    toggleSeller,
    toggleLessor,
    toggleLeaser,
    toggleBuyer,
    clearDemands,
} from "src/slices/customer";
import { resetState as resetPropertyCodes } from "src/slices/customer/misc";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const CustomerTypeSelect = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const seller = useSelector(selectSeller);
    const lessor = useSelector(selectLessor);
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);

    const handleToggleLeaser = () => {
        // going for false => clear demands
        if (leaser && !buyer) {
            dispatch(clearDemands());
            dispatch(resetPropertyCodes());
        }

        dispatch(toggleLeaser());
    };
    const handleToggleBuyer = () => {
        // going for false => clear demands
        if (buyer && !leaser) {
            dispatch(clearDemands());
            dispatch(resetPropertyCodes());
        }

        dispatch(toggleBuyer());
    };

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
                        <Checkbox
                            checked={seller}
                            onClick={() => dispatch(toggleSeller())}
                        />
                        <Typography variant="h6">{t("Seller")}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox
                            checked={lessor}
                            onClick={() => dispatch(toggleLessor())}
                        />
                        <Typography variant="h6">{t("Lessor")}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox
                            checked={leaser}
                            onClick={handleToggleLeaser}
                        />
                        <Typography variant="h6">{t("Leaser")}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Checkbox checked={buyer} onClick={handleToggleBuyer} />
                        <Typography variant="h6">{t("Buyer")}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
export default CustomerTypeSelect;
