import { Grid, Box } from "@mui/material";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    RHFCheckbox,
    RHFDatePicker,
    RHFOnlyNumbers,
} from "src/components/hook-form";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import RHFOnlyNumbersForPrice from "@/components/hook-form/RHFOnlyNumbersForPrice";

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
    const { watch, setValue } = useFormContext();
    const rented = watch("rented");

    const availDate = watch("availableAfter");
    const startDate = watch("rentalStart");

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
                        <RHFOnlyNumbersForPrice
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
