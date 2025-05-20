import { useAuth } from "@/hooks/use-auth";
import { useFilterEmailsQuery } from "@/services/email";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import getThread from "./getThread";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import useGmailPagination, { FIRST_PAGE_TOKEN } from "./useGmailPagination";
import { Box, Stack, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";

const PAGE_SIZE = 20;

const getStackSx = (hasRows: boolean): SxProps<Theme> => ({
    ".MuiTablePagination-root": {
        borderBottom: hasRows ? "1px solid" : undefined,
        borderColor: getBorderColor,
    },

    ".MuiTablePagination-selectLabel": {
        display: "none",
    },
    ".MuiTablePagination-select": {
        display: "none",
    },
    ".MuiInputBase-root": {
        display: "none",
    },

    mt: 1,
    borderRadius: 1,
    bgcolor: "background.paper",
    boxShadow: 5,
    border: "1px solid",
    borderColor: getBorderColor,
});

const List = () => {
    const { user } = useAuth();

    const { filters: body } = useFiltersContext();
    const [pageToken, setPageToken] = useState(FIRST_PAGE_TOKEN);

    const { data, isLoading } = useFilterEmailsQuery({
        body,
        pageSize: PAGE_SIZE,
        pageToken,
        userId: user?.id!,
    });

    const { threads, nextPageToken, resultSizeEstimate } = data || {};
    const totalItems = Boolean(resultSizeEstimate)
        ? resultSizeEstimate!
        : PAGE_SIZE;

    const pagination = useGmailPagination(nextPageToken, setPageToken);

    const hasRows = Array.isArray(threads) && threads.length > 0;

    return (
        <Pagination
            table
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            isLoading={isLoading}
            Container={Stack}
            ContainerProps={{
                flexDirection: "column-reverse",
                sx: getStackSx(hasRows),
            }}
            {...pagination}
        >
            <Box
                height={{
                    xs: "calc(100vh - 220px)",
                    lg: "calc(100vh - 260px)",
                }}
                overflow="hidden auto"
            >
                {threads?.map(getThread)}
            </Box>
        </Pagination>
    );
};

export default List;
