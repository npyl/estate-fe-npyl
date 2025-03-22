import { Grid, Box } from "@mui/material";
import { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    RHFCheckbox,
    RHFDatePicker,
    RHFOnlyNumbers,
} from "src/components/hook-form";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";

const StyledBox = styled(Box)(({ theme }) => ({
    border: "1px dashed",
    borderColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[300]
            : theme.palette.neutral?.[600],
    borderRadius: "10px",
}));

const Rent = () => {
    const { t } = useTranslation();

    const { setValue } = useFormContext();

    const rented = useWatch({ name: "rented" });
    const availDate = useWatch({ name: "availableAfter" });
    const startDate = useWatch({ name: "rentalStart" });

    const handleAvailableAfterChange = useCallback(() => {
        setValue("rentalStart", "");
        setValue("rentalEnd", "");
    }, []);

    const handleRentalStartChange = useCallback(() => {
        setValue("rentalEnd", "");
    }, []);

    return (
        <>
            <RHFCheckbox name="rented" label={t("Rented")} />

            <StyledBox p={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <RHFDatePicker
                            name="availableAfter"
                            label={t("Available After").toString()}
                            disablePast
                            onChange={handleAvailableAfterChange}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        lg={6}
                        display="flex"
                        alignItems="flex-end"
                    >
                        <RHFOnlyNumbers
                            name="currentRentPrice"
                            label={t("Current Rent Price")}
                            adornment="€"
                            disabled={!rented}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <RHFDatePicker
                            name="rentalStart"
                            label={t("Rental Period Start").toString()}
                            disablePast
                            minDate={
                                availDate
                                    ? dayjs(availDate, "YYYY-MM-DD")
                                    : undefined
                            }
                            onChange={handleRentalStartChange}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <RHFDatePicker
                            name="rentalEnd"
                            label={t("Rental Period End").toString()}
                            disablePast
                            minDate={
                                startDate
                                    ? dayjs(startDate, "YYYY-MM-DD")
                                    : undefined
                            }
                        />
                    </Grid>
                </Grid>
            </StyledBox>
        </>
    );
};

export default Rent;
