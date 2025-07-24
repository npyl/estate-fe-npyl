import {
    useDeleteNotificationMutation,
    useFilterNotificationsQuery,
} from "src/services/notification";
import Table from "../table";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { NotificationType } from "@/types/notification";

const sortBy = "createdAt";
const direction = "DESC";

const WorkApplications = ({ filter, searchText }: any) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [deleteNotification, { isLoading }] = useDeleteNotificationMutation();

    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: searchText || "",
            types: ["WORK_FOR_US"] as NotificationType[],
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                      ? false
                      : undefined,
        };
    }, [filter, searchText]);

    const { data: works } = useFilterNotificationsQuery({
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

    const filteredWorks =
        works?.content?.filter((work) => {
            if (filter === "viewed") return work.viewed === true;
            if (filter === "notViewed") return work.viewed === false;
            return true; //ALL
        }) || [];
    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="WORK_FOR_US"
                rows={filteredWorks || []}
                onRemove={handleRemove}
                loading={isLoading}
                page={page}
                filter={filter}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                totalRows={works?.totalElements || 0}
            />
        </Box>
    );
};

export default WorkApplications;
