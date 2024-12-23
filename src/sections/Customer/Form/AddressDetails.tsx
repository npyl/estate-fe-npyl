/* eslint-disable react/jsx-key */
import * as React from "react";

import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { RHFTextField } from "src/components/hook-form";
import { TranslationType } from "src/types/translation";
import { useMemo } from "react";

const getFIELDS = (t: TranslationType) => [
    <RHFTextField fullWidth name="location.street" label={t("Street")} />,
    <RHFTextField fullWidth name="location.number" label={t("Number")} />,
    <RHFTextField fullWidth name="location.city" label={t("City")} />,
];

const AddressDetails: React.FC<any> = () => {
    const { t } = useTranslation();

    const FIELDS = useMemo(() => getFIELDS(t), [t]);

    return (
        <Panel label="Address Details">
            <Grid container spacing={2} p={1}>
                {FIELDS.map((f, i) => (
                    <Grid key={i} item xs={6}>
                        {f}
                    </Grid>
                ))}
            </Grid>
        </Panel>
    );
};
export default AddressDetails;
