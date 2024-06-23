import { useCallback } from "react";
import Search from "./Search";
import { useLazyGetPropertyByIdQuery } from "@/services/properties";
import { RHFDatePicker, RHFTextField } from "@/components/hook-form";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import dayjs from "dayjs";

const PropertyDetails = () => {
    const { i18n } = useTranslation();

    const { setValue } = useFormContext();

    const [getProperty, { data }] = useLazyGetPropertyByIdQuery();

    const handlePropertySelect = useCallback(
        (id: number) =>
            getProperty(id)
                .unwrap()
                .then((p) => {
                    setValue("title", p.descriptions[i18n.language].title);
                }),
        [i18n.language]
    );

    return (
        <>
            <Search onSelectProperty={handlePropertySelect} />

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
        </>
    );
};

export default PropertyDetails;
