import * as React from "react";

import {
    selectNumber,
    selectStreet,
    setStreet,
    setNumber,
    setCity,
    selectCity,
} from "src/slices/customer";

import { useSelector } from "react-redux";

import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Panel from "src/components/Panel";

const AddressDetails: React.FC<any> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const street = useSelector(selectStreet);
    const city = useSelector(selectCity);
    const number = useSelector(selectNumber);

    const handleChange = (
        setter: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setter(event.target.value));

    return (
        <Panel label="Address Details">
            <Grid container spacing={2} p={1}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={t("Street")}
                        value={street}
                        onChange={(event) => handleChange(setStreet, event)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={t("Number")}
                        value={number}
                        onChange={(event) => handleChange(setNumber, event)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={t("City")}
                        value={city}
                        onChange={(event) => handleChange(setCity, event)}
                    />
                </Grid>
            </Grid>
        </Panel>
    );
};
export default AddressDetails;
