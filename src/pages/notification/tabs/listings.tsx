import {
    useDeleteNotificationMutation,
    useFilterNotificationsQuery,
    useToggleNotificationViewedStatusMutation,
} from "src/services/notification";
import Table from "../table";
import { ContactNotification } from "@/types/notification";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Listings = ({ filter }: any) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("createdAt"); // assuming 'createdAt' is a valid field to sort by
    const [direction, setDirection] = useState("ASC");

    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();
    const { data: listings } = useFilterNotificationsQuery({
        filter: { types: ["LISTING"] },
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

    const filteredListing =
        listings?.content?.filter((listing) => {
            if (filter === "viewed") return listing.viewed === true;
            if (filter === "notViewed") return listing.viewed === false;
            return true; //ALL
        }) || [];

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="LISTING"
                rows={filteredListing || []}
                onRemove={handleRemove}
                loading={isLoading}
                sortBy={sortBy}
                direction={direction}
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={listings?.totalElements || 0}
            />
        </Box>
    );
};

export default Listings;
