import { useState } from "react";
import { usePropertyHistoryPaginatedQuery } from "src/services/logs";
import { Box, Pagination, Stack } from "@mui/material";
import { NextPage } from "next";
import { useSelector } from "react-redux";
import { selectAll } from "src/slices/log";
import LogCard from "@/components/Cards/LogCard";
import { useRouter } from "next/router";

const PropertyLogs: NextPage = () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const allFilters = useSelector(selectAll);
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = usePropertyHistoryPaginatedQuery({
        id: +propertyId!,
        page,
        pageSize,
    });

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value - 1); // Adjust page number for zero-based numbering API
    };

    // Main content to render
    const content = data?.content.map((log) => (
        <LogCard key={log.createdAt} log={log} />
    ));

    return (
        <Box>
            <Stack spacing={2}>{content}</Stack>
            {data && ( // Only display pagination when data is loaded
                <Box
                    display="flex" // Establishes a flex container
                    justifyContent="center" // Centers items on the main axis
                    alignItems="center" // Centers items on the cross axis
                    my={3} // Adds spacing around the Box, change as needed
                >
                    <Pagination
                        count={data.totalPages}
                        page={page + 1} // Adjust for 1-based numbering of Material-UI Pagination
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </Box>
    );
};

export default PropertyLogs;
