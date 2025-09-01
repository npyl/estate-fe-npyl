/* eslint-disable react/jsx-key */
import * as React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Panel from "@/components/Panel";
import { RHFTextField } from "@/components/hook-form";
import { TranslationType } from "@/types/translation";
import { useMemo } from "react";
import getIndexMapped from "@/utils/getIndexMapped";

const getFIELDS = (t: TranslationType) =>
    getIndexMapped([
        <RHFTextField fullWidth name="location.street" label={t("Street")} />,
        <RHFTextField fullWidth name="location.number" label={t("Number")} />,
        <RHFTextField fullWidth name="location.city" label={t("City")} />,
    ]);

const AddressDetails: React.FC<any> = () => {
    const { t } = useTranslation();

    const FIELDS = useMemo(() => getFIELDS(t), [t]);

    return (
        <Panel label={t("Address")}>
            <Grid container spacing={2} p={1}>
                {FIELDS.map((f, i) => (
                    <Grid key={f.id} item xs={6}>
                        {f.item}
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};
export default AddressDetails;
