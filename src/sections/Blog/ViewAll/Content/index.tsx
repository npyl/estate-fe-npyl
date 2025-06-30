import { useFilterBlogPostsQuery } from "@/services/company";
import getPost from "./getPost";
import { BlogPostRes } from "@/types/company";
import Pagination, { usePagination } from "@/components/Pagination";
import { useFiltersContext } from "@/sections/Blog/ViewAll/Filters/Context";
import { FC } from "react";

const PAGE_SIZE = 5;

const FAKE_DATA: BlogPostRes[] = [
    { id: 1, title: "Some post #1", content: "" },
];

interface ContentProps {
    siteId: number;
}

const Content: FC<ContentProps> = ({ siteId }) => {
    const { filters } = useFiltersContext();
    const { data, isLoading } = useFilterBlogPostsQuery({ siteId, filters });
    const totalItems = data?.totalElements ?? PAGE_SIZE;
    const pagination = usePagination();

    return (
        <Pagination
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            {...pagination}
        >
            {FAKE_DATA?.map(getPost(siteId))}
        </Pagination>
    );
};

export default Content;
