import { useAuth } from "@/sections/use-auth";
import { useFilterEmailsQuery } from "@/services/email";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import getThread from "./getThread";
import { useCallback, useState } from "react";
import useGmailPagination, { FIRST_PAGE_TOKEN } from "./useGmailPagination";
import Pagination from "./Pagination";
import ViewById from "../ViewById";

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

    const { threads, nextPageToken, resultSizeEstimate } = data ?? {};
    const totalItems = resultSizeEstimate ?? PAGE_SIZE;

    const pagination = useGmailPagination(nextPageToken, setPageToken);

    const [clicked, setClicked] = useState<string>();
    const onBack = useCallback(() => setClicked(undefined), []);

    if (clicked) return <ViewById id={clicked} onBack={onBack} />;

    return (
        <Pagination
            table
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            isLoading={isLoading}
            {...pagination}
        >
            {threads?.map(getThread(setClicked))}
        </Pagination>
    );
};

export default List;
