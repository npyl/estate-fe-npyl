import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";
import { StyledStack } from "./styled";
import dayjs from "dayjs";
import Autofiller from "./Autofiller";
import SelectedProperty from "./SelectedProperty";
import toLocalDate from "@/utils/toLocalDate";
import { useTranslation } from "react-i18next";

// ------------------------------------------------------------------------

interface Props {
    // INFO: this means agreement's fields will be filled with property data
    shouldAutofill: boolean;
}

const PropertyDetails: React.FC<Props> = ({ shouldAutofill }) => {
    const { t } = useTranslation();

    const { setValue } = useFormContext();

    // Everytime startingDate changes, update expirationDate as +12 months
    const handleStartingChange = (v: string) => {
        setValue("availableAfter", v);
        setValue(
            "expirationDate",
            toLocalDate(dayjs(v, "YYYY-MM-DD").add(12, "month").toISOString())
        );
    };

    return (
        <StyledStack>
            {/* Autofiller */}
            {shouldAutofill ? <Autofiller /> : null}

            <SelectedProperty />

            <RHFTextField name="title" label={t("Title").toString()} />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="startingDate"
                        label={t("Starting Date").toString()}
                        disablePast
                        onChange={handleStartingChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="expirationDate"
                        label={t("Expiration Date").toString()}
                        disablePast
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="availableAfter"
                        label={t("Available After").toString()}
                        disablePast
                    />
                </Grid>
            </Grid>
        </StyledStack>
    );
};

export default PropertyDetails;
