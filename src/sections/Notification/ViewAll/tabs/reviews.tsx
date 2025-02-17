import {
    useDeleteNotificationMutation,
    useFilterNotificationsQuery,
} from "src/services/notification";
import Table from "../table";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { NotificationType } from "@/types/notification";

const Reviews = ({ filter, searchText }: any) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("createdAt");
    const [direction, setDirection] = useState("DESC");
    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: searchText || "",
            types: ["REVIEW"] as NotificationType[],
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                    ? false
                    : undefined,
        };
    }, [filter, searchText]);
    const { data: reviews } = useFilterNotificationsQuery({
        filter: filterBody,
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

    const filteredReviews =
        reviews?.content?.filter((review) => {
            if (filter === "viewed") return review.viewed === true;
            if (filter === "notViewed") return review.viewed === false;
            return true; //ALL
        }) || [];
    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="REVIEW"
                rows={filteredReviews || []}
                onRemove={handleRemove}
                loading={isLoading}
                sortBy={sortBy}
                direction={direction}
                page={page}
                filter={filter}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={reviews?.totalElements || 0}
            />
        </Box>
    );
};

export default Reviews;
