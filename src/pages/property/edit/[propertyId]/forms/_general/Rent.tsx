import { Grid, Box } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    RHFCheckbox,
    RHFDatePicker,
    RHFOnlyNumbers,
} from "src/components/hook-form";
import { styled } from "@mui/material/styles";

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

    useEffect(() => {
        setValue("rentalStart", "");
        setValue("rentalEnd", "");
    }, [availDate]);

    useEffect(() => {
        setValue("rentalEnd", "");
    }, [startDate]);

    return (
        <>
            <RHFCheckbox name="rented" label={t("Rented")} />

            <StyledBox p={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <RHFDatePicker
                            fullWidth
                            name="availableAfter"
                            label={t("Available After").toString()}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
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
                            pickerProps={{
                                minDate: availDate,
                            }}
                            label={t("Rental Period Start").toString()}
                        />
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <RHFDatePicker
                            name="rentalEnd"
                            label={t("Rental Period End").toString()}
                            pickerProps={{
                                minDate: startDate,
                            }}
                        />
                    </Grid>
                </Grid>
            </StyledBox>
        </>
    );
};

export default Rent;
