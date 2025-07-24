import {
    useDeleteNotificationMutation,
    useFilterNotificationsQuery,
} from "src/services/notification";
import Table from "../../table";
import { Box } from "@mui/material";
import { FC, useMemo, useState } from "react";
import { TViewFilter } from "../../types";
import { NotificationType } from "@/types/notification";

const sortBy = "updatedAt";
const direction = "DESC";

interface StayUpdatedProps {
    filter: TViewFilter;
    searchText?: string;
}

const StayUpdated: FC<StayUpdatedProps> = ({ filter, searchText }) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: searchText || "",
            types: ["STAY_UPDATED"] as NotificationType[],
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                      ? false
                      : undefined,
        };
    }, [filter, searchText]);
    const { data } = useFilterNotificationsQuery({
        filter: filterBody,
        page,
        pageSize,
        sortBy,
        direction,
    });

    const handlePageChange = (_: any, newPage: any) => setPage(newPage);

    const handleRowsPerPageChange = (event: any) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0); // reset to the first page
    };

    const filtered =
        data?.content?.filter((agreement) => {
            if (filter === "viewed") return agreement.viewed === true;
            if (filter === "notViewed") return agreement.viewed === false;
            return true; //ALL
        }) || [];

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="STAY_UPDATED"
                rows={filtered}
                onRemove={deleteNotification}
                loading={isLoading}
                page={page}
                filter={filter}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={data?.totalElements || 0}
            />
        </Box>
    );
};

export default StayUpdated;
