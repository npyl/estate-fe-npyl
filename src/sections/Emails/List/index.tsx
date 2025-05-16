import { useAuth } from "@/hooks/use-auth";
import { useFilterEmailsQuery } from "@/services/email";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import getThread from "./getThread";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import useGmailPagination, { FIRST_PAGE_TOKEN } from "./useGmailPagination";
import { Stack, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";

const PAGE_SIZE = 10;

const StackSx: SxProps<Theme> = {
    ".MuiTablePagination-root": {
        borderTop: "1px solid",
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
};

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

    return (
        <Stack sx={StackSx}>
            <Pagination
                table
                pageSize={PAGE_SIZE}
                totalItems={totalItems}
                isLoading={isLoading}
                Container={Stack}
                {...pagination}
            >
                {threads?.map(getThread)}
            </Pagination>
        </Stack>
    );
};

export default List;
