import { Grid } from "@mui/material";
import { useGlobals } from "@/sections/useGlobals";
import CustomerTypeSelect from "./TypeSelect";
import { useTranslation } from "react-i18next";
import Panel from "src/components/Panel";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import getFIELDS from "./getFields";
import useGetCustomer from "@/sections/Customer/hooks/useGetCustomer";
import B2bSwitch from "./B2BSwitch";

const CustomerInformation = () => {
    const { t } = useTranslation();

    const { customerId } = useGetCustomer();

    const isB2B = Boolean(useWatch({ name: "b2b" }));
    const label = isB2B ? "B2B Customer Information" : "Customer Information";

    const enums = useGlobals();
    const leadSource = useWatch({ name: "leadSource" });

    const nationalitiesEnum = enums?.customer?.nationality || [];
    const leadSourceEnum = enums?.customer?.leadSource || [];

    const FIELDS = useMemo(
        () =>
            getFIELDS(
                t,
                isB2B,
                nationalitiesEnum,
                leadSourceEnum,
                leadSource,
                customerId as string
            ),
        [t, isB2B, nationalitiesEnum, leadSourceEnum, leadSource, customerId]
    );

    return (
        <Panel label={t(label)} endNode={<B2bSwitch />}>
            <Grid container spacing={2} p={1.5}>
                {FIELDS.map((f, i) => (
                    <Grid key={i} item xs={12} sm={6}>
                        {f}
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <CustomerTypeSelect />
                </Grid>
            </Grid>
        </Panel>
    );
};

export default CustomerInformation;
