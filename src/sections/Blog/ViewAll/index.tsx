import { useGetBlogPostsQuery } from "@/services/company";
import { FC } from "react";
import getPost from "./getPost";
import { BlogPostRes } from "@/types/company";
import Pagination, { usePagination } from "@/components/Pagination";

const PAGE_SIZE = 5;

const FAKE_DATA: BlogPostRes[] = [
    { id: 1, title: "Some post #1", content: "" },
];

interface Props {
    siteId: number;
}

const ViewAllPosts: FC<Props> = ({ siteId }) => {
    const { data, isLoading } = useGetBlogPostsQuery(siteId);
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

export default ViewAllPosts;
