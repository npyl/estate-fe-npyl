import {
    RHFCheckbox,
    RHFDatePicker,
    RHFTextField,
} from "@/components/hook-form";
import { useFormContext } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { StyledStack } from "./styled";
import dayjs from "dayjs";
import Autofiller from "./Autofiller";
import SelectedProperty from "./SelectedProperty";
import toLocalDate from "@/utils/toLocalDate";
import { useTranslation } from "react-i18next";
import RHFButtonGroup from "./Buttons/RHFButtonGroup";
import RHFLanguageButton from "./Buttons/LanguageButton";

// ------------------------------------------------------------------------

interface Props {
    isCustomer: boolean;
    // INFO: this means agreement's fields will be filled with property data
    shouldAutofill: boolean;
}

const PropertyDetails: React.FC<Props> = ({ isCustomer, shouldAutofill }) => {
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

            <Divider />

            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="center"
                spacing={1}
            >
                {!isCustomer ? <RHFButtonGroup /> : null}

                <RHFLanguageButton />
            </Stack>

            <Divider />

            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <RHFDatePicker
                        name="startingDate"
                        label={t("Starting Date").toString()}
                        disablePast
                        onChange={handleStartingChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFDatePicker
                        name="expirationDate"
                        label={t("Expiration Date").toString()}
                        disablePast
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RHFDatePicker
                        name="availableAfter"
                        label={t("Available After").toString()}
                        disablePast
                    />
                </Grid>
                <Grid item xs={12} sm={6} display="flex" alignItems="center">
                    <RHFCheckbox
                        labelPlacement="start"
                        name="keys"
                        label={t("_keys_")}
                    />
                </Grid>
            </Grid>
        </StyledStack>
    );
};

export default PropertyDetails;
