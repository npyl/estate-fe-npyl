import { useFilterNotificationsQuery } from "src/services/notification";
import Table from "../table";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { NotificationType } from "@/types/notification";

const sortBy = "createdAt";
const direction = "DESC";

const Agreements = ({ filter, searchText }: any) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: searchText || "",
            types: ["AGREEMENT"] as NotificationType[],
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                      ? false
                      : undefined,
        };
    }, [filter, searchText]);

    const { data: agreements } = useFilterNotificationsQuery({
        filter: filterBody,
        page,
        pageSize,
        sortBy,
        direction,
    });

    const handlePageChange = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: any) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0); // reset to the first page
    };

    const fileteredAgreements =
        agreements?.content?.filter((agreement) => {
            if (filter === "viewed") return agreement.viewed === true;
            if (filter === "notViewed") return agreement.viewed === false;
            return true; //ALL
        }) || [];
    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="AGREEMENT"
                rows={fileteredAgreements || []}
                page={page}
                filter={filter}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={agreements?.totalElements || 0}
            />
        </Box>
    );
};

export default Agreements;
