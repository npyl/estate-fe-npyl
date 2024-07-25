import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { StyledStack } from "./styled";
import dayjs from "dayjs";
import RHFPropertySearch from "./RHFSearch";
import PropertyFiller from "./PropertyFiller";

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
    const handleStartingChange = (value: dayjs.Dayjs) => {
        setValue("availableAfter", value);
        setValue("expirationDate", value.add(12, "month"));
    };

    return (
        <StyledStack>
            {/* /property/[propertyId] & CREATE case */}
            {propertyId && shouldAutofill ? <PropertyFiller /> : null}

            {/* Property Search: /agreements & CREATE case */}
            {!propertyId && shouldAutofill ? <RHFPropertySearch /> : null}

            <RHFTextField name="title" label="Title" />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="startingDate"
                        label="Starting Date"
                        onChange={handleStartingChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="expirationDate"
                        label="Expiration Date"
                    />
                </Grid>
                <Grid item xs={6}>
                    <RHFDatePicker
                        name="availableAfter"
                        label="Available After"
                    />
                </Grid>
            </Grid>
        </StyledStack>
    );
};

export default PropertyDetails;
