import { useCallback, useEffect } from "react";
import Search from "./Search";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { StyledStack } from "./styled";

// ------------------------------------------------------------------------

const RHFPropertySearch = () => {
    const { i18n } = useTranslation();

    const { setValue } = useFormContext();

    const [getProperty] = useLazyGetPropertyByIdQuery();

    const handlePropertySelect = useCallback(
        (id: number) =>
            getProperty(id)
                .unwrap()
                .then((p) => {
                    setValue("propertyId", p.id);
                    setValue("title", p.descriptions[i18n.language].title);
                }),
        [i18n.language]
    );

    return <Search onSelectProperty={handlePropertySelect} />;
};

// ------------------------------------------------------------------------

const PropertyFiller = () => {
    console.log("FILLER");

    const { i18n } = useTranslation();
    const { setValue } = useFormContext();

    const router = useRouter();
    const { propertyId } = router.query;

    const [getProperty] = useLazyGetPropertyByIdQuery();

    // NOTE: make sure we setValue() AFTER the ui has loaded to prevent not-showing change
    useEffect(() => {
        getProperty(+propertyId!)
            .unwrap()
            .then((p) => {
                setValue("propertyId", p.id);
                setValue("title", p.descriptions[i18n.language].title);
            });
    }, [i18n.language]);

    return null;
};

// ------------------------------------------------------------------------

interface Props {
    // INFO: this means agreement's fields will be filled with property data
    shouldAutofill: boolean;
}

const PropertyDetails: React.FC<Props> = ({ shouldAutofill }) => {
    const router = useRouter();
    const { propertyId } = router.query;

    return (
        <StyledStack>
            {/* /property/[propertyId] & CREATE case */}
            {propertyId && shouldAutofill ? <PropertyFiller /> : null}

            {/* Property Search: /agreements & CREATE case */}
            {!propertyId && shouldAutofill ? <RHFPropertySearch /> : null}

            <RHFTextField name="title" label="Title" />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <RHFDatePicker name="startingDate" label="Starting Date" />
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
