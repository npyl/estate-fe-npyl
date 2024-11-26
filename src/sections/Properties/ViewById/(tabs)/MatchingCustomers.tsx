import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSuggestForPropertyQuery } from "src/services/properties";
import DataGrid from "@/components/DataGrid/Customer";
import Panel from "@/components/Panel";
import { GridPaginationModel } from "@mui/x-data-grid";
import CustomerCard from "@/components/Cards/CustomerCard";
import useResponsive from "@/hooks/useResponsive";
import { Grid } from "@mui/material";
import Pagination, { usePagination } from "@/components/Pagination";

const pageSize = 5;

const MatchingCustomersSection: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { t } = useTranslation();

    const pagination = usePagination();

    const { data: customersPage, isLoading } = useSuggestForPropertyQuery({
        propertyId: +propertyId!,
        page: pagination.page,
        pageSize,
    });

    const totalRows = customersPage?.totalElements ?? pageSize;

    const customers = useMemo(
        () => customersPage?.content || [],
        [customersPage]
    );

    const handlePaginationChange = useCallback(
        (model: GridPaginationModel) => pagination.onChange(null, model.page),
        []
    );

    const belowMd = useResponsive("down", "md");

    if (belowMd) {
        return (
            <Pagination
                {...pagination}
                isLoading={isLoading}
                totalItems={totalRows}
                pageSize={pageSize}
                Container={Grid}
                ContainerProps={{
                    container: true,
                    spacing: 1,
                }}
            >
                {customers.map((c, i) => (
                    <Grid item key={i} xs={12} sm={6}>
                        <CustomerCard c={c} />
                    </Grid>
                ))}
            </Pagination>
        );
    }

    return (
        <Panel
            label={t("Matching Customers")}
            childrenSx={{
                p: 0,
            }}
        >
            <DataGrid
                rows={customers}
                resource="customer"
                page={pagination.page}
                pageSize={pageSize}
                totalRows={totalRows}
                onPaginationModelChange={handlePaginationChange}
            />
        </Panel>
    );
};

export default MatchingCustomersSection;
