import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { StyledStack } from "./styled";
import dayjs from "dayjs";
import RHFPropertySearch from "./RHFSearch";
import PropertyFiller from "./PropertyFiller";
import SelectedProperty from "./SelectedProperty";
import toLocalDate from "@/utils/toLocalDate";

// ------------------------------------------------------------------------

interface Props {
    // INFO: this means agreement's fields will be filled with property data
    shouldAutofill: boolean;
}

const PropertyDetails: React.FC<Props> = ({ shouldAutofill }) => {
    const router = useRouter();
    const { propertyId } = router.query;

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
            {/* /property/[propertyId] & CREATE case */}
            {propertyId && shouldAutofill ? <PropertyFiller /> : null}

            {/* Property Search: /agreements & CREATE case */}
            {!propertyId && shouldAutofill ? <RHFPropertySearch /> : null}

            {!propertyId ? <SelectedProperty /> : null}

            <RHFTextField name="title" label="Title" />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="startingDate"
                        label="Starting Date"
                        disablePast
                        onChange={handleStartingChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="expirationDate"
                        label="Expiration Date"
                        disablePast
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="availableAfter"
                        label="Available After"
                        disablePast
                    />
                </Grid>
            </Grid>
        </StyledStack>
    );
};

export default PropertyDetails;
