import { useFilterBlogPostsQuery } from "@/services/blog";
import getPost from "./getPost";
import { BlogPostRes } from "@/types/company";
import Pagination, { usePagination } from "@/components/Pagination";
import { useFiltersContext } from "@/sections/Blog/ViewAll/Filters/Context";

const PAGE_SIZE = 5;

const FAKE_DATA: BlogPostRes[] = [
    {
        id: 1,
        title: "Some post #1",
        content: "",
        createdAt: "",
        sites: [],
        updatedAt: "",
        URL: "",
        user: {} as any,
        viewCounter: 0,
    },
];

const Content = () => {
    const { filters } = useFiltersContext();
    const { data, isLoading } = useFilterBlogPostsQuery(filters);
    const totalItems = data?.totalElements ?? PAGE_SIZE;
    const pagination = usePagination();

    return (
        <Pagination
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            {...pagination}
        >
            {FAKE_DATA?.map(getPost)}
        </Pagination>
    );
};

export default Content;
