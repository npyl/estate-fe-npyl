import DataGrid from "@/components/DataGrid";
import Pagination, { usePagination } from "@/components/Pagination";
import useResponsive from "@/hooks/useResponsive";
import { useFilterOrganizationsQuery } from "@/services/organization";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { GridPaginationModel } from "@mui/x-data-grid";
import { FC, useCallback, useState } from "react";

const PAGE_SIZE = 20;

const Organisation = () => null;

const getOrganisation = () => <Organisation />;

const FilterSection: FC<any> = () => {
    return null;
};

const ViewAll = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZE);

    const { data, isLoading } = useFilterOrganizationsQuery({
        body: { search: "" },
        page,
        pageSize: PAGE_SIZE,
        sortBy: "updatedAt",
        direction: "ASC",
    });
    const totalElements = data?.totalElements ?? 10;
    const content = data?.content ?? [];

    const belowMd = useResponsive("down", "md");
    const pagination = usePagination();

    const onPaginationChange = useCallback((model: GridPaginationModel) => {
        setPageSize(model.pageSize);
        setPage(model.page);
    }, []);

    return (
        <>
            <FilterSection />

            {belowMd ? (
                <Pagination
                    {...pagination}
                    isLoading={isLoading}
                    pageSize={pageSize}
                    page={page}
                    totalItems={totalElements}
                    Container={Grid}
                    ContainerProps={{
                        container: true,
                        spacing: 2,
                    }}
                >
                    {content?.map(getOrganisation)}
                </Pagination>
            ) : (
                <Paper>
                    <DataGrid
                        columns={[]}
                        loading={isLoading}
                        rows={content}
                        page={page}
                        pageSize={PAGE_SIZE}
                        totalRows={totalElements}
                        onPaginationModelChange={onPaginationChange}
                    />
                </Paper>
            )}
        </>
    );
};

export default ViewAll;
