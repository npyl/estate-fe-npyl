import { Grid } from "@mui/material";
import { useGlobals } from "src/hooks/useGlobals";
import { useAllUsersQuery } from "src/services/user";
import CustomerTypeSelect from "./TypeSelect";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Panel from "src/components/Panel";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import getFIELDS from "./getFields";

const CustomerInformation = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { customerId } = router.query;
    const enums = useGlobals();
    const managers = useAllUsersQuery().data || [];
    const leadSource = useWatch({ name: "leadSource" });

    const nationalitiesEnum = enums?.customer?.nationality || [];
    const leadSourceEnum = enums?.customer?.leadSource || [];

    const FIELDS = useMemo(
        () =>
            getFIELDS(
                t,
                managers,
                nationalitiesEnum,
                leadSourceEnum,
                leadSource,
                customerId as string
            ),
        [t, managers, nationalitiesEnum, leadSourceEnum, leadSource, customerId]
    );

    return (
        <Panel label={t("Customer Information")}>
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
