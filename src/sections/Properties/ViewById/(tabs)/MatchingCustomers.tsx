import { useRouter } from "next/router";
import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSuggestForPropertyQuery } from "src/services/properties";
import DataGrid from "@/ui/DataGrids/Customer";
import { GridPaginationModel } from "@mui/x-data-grid";
import CustomerCard from "@/ui/Cards/CustomerCard";
import useResponsive from "@/hooks/useResponsive";
import Grid from "@mui/material/Unstable_Grid2";
import Pagination, { usePagination } from "@/components/Pagination";

const pageSize = 25;

const MatchingCustomersSection: React.FC = () => {
    const router = useRouter();
    const { propertyId } = router.query;

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
            >
                <Grid container spacing={1}>
                    {customers.map((c) => (
                        <Grid key={c.id} xs={12} sm={6}>
                            <CustomerCard c={c} />
                        </Grid>
                    ))}
                </Grid>
            </Pagination>
        );
    }

    return (
        <DataGrid
            rows={customers}
            page={pagination.page}
            pageSize={pageSize}
            totalRows={totalRows}
            onPaginationModelChange={handlePaginationChange}
        />
    );
};

export default MatchingCustomersSection;
