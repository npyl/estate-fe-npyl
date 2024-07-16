import { useCallback, useEffect } from "react";
import Search from "./Search";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormHelperText, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { StyledStack } from "./styled";
import dayjs from "dayjs";

// ------------------------------------------------------------------------

const RHFPropertySearch = () => {
    const { i18n } = useTranslation();

    const { control, setValue } = useFormContext();

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

    return (
        <Controller
            name="propertyId"
            control={control}
            render={({ fieldState: { error } }) => (
                <>
                    <Search onSelectProperty={handlePropertySelect} />

                    {!!error ? (
                        <FormHelperText error sx={{ px: 2 }}>
                            {error.message}
                        </FormHelperText>
                    ) : null}
                </>
            )}
        />
    );
};

// ------------------------------------------------------------------------

const PropertyFiller = () => {
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
                        defaultValue={dayjs().add(12, "month")} // Initial value (12 months ahead from today)
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
