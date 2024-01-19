import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DateObject } from "react-multi-date-picker";
import {
    RHFCheckbox,
    RHFDatePicker,
    RHFOnlyNumbers,
} from "src/components/hook-form";

const Rent = () => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const rented = watch("rented");

    const availDate = watch("availableAfter");
    const startDate = watch("rentalStart");

    useEffect(() => {
        setValue("rentalStart", "");
        setValue("rentalEnd", "");
    }, [availDate]);

    useEffect(() => {
        setValue("rentalEnd", "");
    }, [startDate]);

    return (
        <Grid item xs={12} p={1}>
            <RHFCheckbox name="rented" label={t("Rented")} />

            <Grid
                container
                spacing={0}
                sx={{
                    padding: "10px",
                    border: "1px solid #000000",
                    borderRadius: "10px",
                }}
            >
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <RHFDatePicker
                                name="availableAfter"
                                label={t("Available After").toString()}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFOnlyNumbers
                                name="currentRentPrice"
                                label={t("Current Rent Price")}
                                adornment="€"
                                disabled={!rented}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFDatePicker
                                name="rentalStart"
                                pickerProps={{
                                    minDate: availDate,
                                }}
                                label={t("Rental Period Start").toString()}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <RHFDatePicker
                                name="rentalEnd"
                                label={t("Rental Period End").toString()}
                                pickerProps={{
                                    minDate: startDate,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Rent;
