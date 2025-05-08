import { useAuth } from "@/hooks/use-auth";
import { useFilterEmailsQuery } from "@/services/email";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import getEmail from "./getEmail";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import useGmailPagination, { FIRST_PAGE_TOKEN } from "./useGmailPagination";
import { Stack } from "@mui/material";

const PAGE_SIZE = 10;

const List = () => {
    const { user } = useAuth();

    const { from, to, propertyIds } = useFiltersContext();
    const [pageToken, setPageToken] = useState(FIRST_PAGE_TOKEN);

    const { data, isLoading } = useFilterEmailsQuery({
        body: {
            from,
            to,
            propertyIds,
        },
        pageSize: PAGE_SIZE,
        pageToken,
        userId: user?.id!,
    });

    const { messages, nextPageToken, resultSizeEstimate } = data || {};
    const totalItems = Boolean(resultSizeEstimate)
        ? resultSizeEstimate!
        : PAGE_SIZE;

    const pagination = useGmailPagination(nextPageToken, setPageToken);

    return (
        <Pagination
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            isLoading={isLoading}
            Container={Stack}
            ContainerProps={{
                mt: 1,
                boxShadow: 20,
            }}
            {...pagination}
        >
            {messages?.map(getEmail)}
        </Pagination>
    );
};

export default List;
