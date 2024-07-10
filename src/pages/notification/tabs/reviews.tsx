import {
    useDeleteNotificationMutation,
    useFilterNotificationsMutation,
    useToggleNotificationViewedStatusMutation,
} from "src/services/notification";
import Table from "../table";
import { ContactNotification } from "@/types/notification";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const Reviews = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("createdAt"); // assuming 'createdAt' is a valid field to sort by
    const [direction, setDirection] = useState("ASC");

    const [deleteNotification, { isLoading: isDeleting }] =
        useDeleteNotificationMutation();
    const [toggleNotificationViewedStatus] =
        useToggleNotificationViewedStatusMutation();
    const [filterNotifications, { data: rows, isLoading }] =
        useFilterNotificationsMutation();

    const [notifications, setNotifications] = useState<ContactNotification[]>(
        []
    );

    const fetchFilteredNotifications = () => {
        filterNotifications({
            filter: { types: ["REVIEW"] }, // Assuming 'review' is a valid type to filter by
            page,
            pageSize,
            sortBy,
            direction,
        });
    };

    useEffect(() => {
        fetchFilteredNotifications();
    }, [page, pageSize, sortBy, direction]);

    useEffect(() => {
        if (rows?.content) {
            setNotifications(rows.content);
        }
    }, [rows]);

    const handleRemove = (id: number) => {
        deleteNotification(id).then(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notif) => notif.id !== id)
            );
        });
    };

    const handleViewNotification = async (
        notification: ContactNotification
    ) => {
        if (!notification.viewed) {
            await toggleNotificationViewedStatus({
                id: notification.id || 0,
                viewed: true,
            });

            setNotifications((prevNotifications) =>
                prevNotifications.map((notif) =>
                    notif.id === notification.id
                        ? { ...notif, viewed: true }
                        : notif
                )
            );
        }
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
                variant="REVIEW"
                rows={notifications}
                onRemove={handleRemove}
                loading={isLoading || isDeleting}
                onViewNotification={handleViewNotification}
                sortBy={sortBy}
                direction={direction}
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={rows?.totalElements || 0}
            />
        </Box>
    );
};

export default Reviews;
