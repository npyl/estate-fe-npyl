import { useAuth } from "@/hooks/use-auth";
import { useFilterEmailsQuery } from "@/services/email";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import getThread from "./getThread";
import { useState } from "react";
import useGmailPagination, { FIRST_PAGE_TOKEN } from "./useGmailPagination";
import Pagination from "./Pagination";

const PAGE_SIZE = 20;

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
        <Pagination
            table
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            isLoading={isLoading}
            {...pagination}
        >
            {threads?.map(getThread)}
        </Pagination>
    );
};

export default List;
