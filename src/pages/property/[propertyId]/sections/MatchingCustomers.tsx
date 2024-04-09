import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSuggestForPropertyQuery } from "src/services/properties";
import DataGrid from "@/components/DataGrid/Customer";
import Panel from "@/components/Panel";
import { GridPaginationModel } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import CustomerCard from "@/components/CustomerCard";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";

const pageSize = 5;

const MatchingCustomersSection: React.FC = () => {
    const router = useRouter();
    const { t } = useTranslation();

    const { propertyId } = router.query;

    const [page, setPage] = useState(0);

    const { data: customersPage } = useSuggestForPropertyQuery(
        // εδώ πρέπει να φτιάξω καινούριο query useSuggestForPropertyQuery
        { propertyId: +propertyId!, page, pageSize }
    );

    const totalRows = useMemo(
        () => customersPage?.totalElements || 1,
        [customersPage?.totalElements]
    );

    const customers = useMemo(
        () => customersPage?.content || [],
        [customersPage]
    );

    const handlePaginationChange = useCallback(
        (model: GridPaginationModel) => setPage(model.page),
        []
    );

    const belowMd = useResponsive("down", "md");

    return (
        <Panel label={t("Matching Customers")}>
            {belowMd ? (
                <Grid container spacing={2}>
                    {customers.map((c, i) => (
                        <Grid item key={i} xs={12} sm={6}>
                            <CustomerCard c={c} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <DataGrid
                    rows={customers}
                    resource="customer"
                    sortingBy="firstName"
                    sortingOrder="asc"
                    page={page}
                    pageSize={pageSize}
                    totalRows={totalRows}
                    onPaginationModelChange={handlePaginationChange}
                />
            )}
        </Panel>
    );
};

export default MatchingCustomersSection;
