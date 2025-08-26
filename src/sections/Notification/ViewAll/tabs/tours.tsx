import { useFilterNotificationsQuery } from "src/services/notification";
import Table from "../table";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { NotificationType } from "@/types/notification";
import router from "next/router";

const sortBy = "createdAt";
const direction = "DESC";

const Tours = ({ filter, searchText }: any) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { user } = router.query;

    const filterBody = useMemo(() => {
        return {
            fromDate: null,
            toDate: null,
            search: searchText || "",
            types: ["TOUR"] as NotificationType[],
            user: user ? Number(user) : undefined,
            viewed:
                filter === "viewed"
                    ? true
                    : filter === "notViewed"
                      ? false
                      : undefined,
        };
    }, [filter, searchText, user]);

    const { data: tours } = useFilterNotificationsQuery({
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
        setPage(0);
    };

    const filteredTours =
        tours?.content?.filter((tour) => {
            if (filter === "viewed") return tour.viewed === true;
            if (filter === "notViewed") return tour.viewed === false;
            return true; //ALL
        }) || [];

    return (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Table
                variant="TOUR"
                rows={filteredTours || []}
                filter={filter}
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
