import {
    useDeleteNotificationMutation,
    useFilterNotificationsQuery,
} from "src/services/notification";
import Table from "../table";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Tours = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("createdAt");
    const [direction, setDirection] = useState("ASC");

    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
    const { data: tours } = useFilterNotificationsQuery({
        filter: { types: ["TOUR"] },
        page,
        pageSize,
        sortBy,
        direction,
    });

    const handleRemove = (id: number) => {
        deleteNotification(id);
    };

    const handlePageChange = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: any) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0); // reset to the first page
    };

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="CONTACT"
                rows={tours?.content || []}
                onRemove={handleRemove}
                loading={isLoading}
                sortBy={sortBy}
                direction={direction}
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={tours?.totalElements || 0}
            />
        </Box>
    );
};

export default Tours;
