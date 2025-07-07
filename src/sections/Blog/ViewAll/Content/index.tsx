import { useFilterBlogPostsQuery } from "@/services/blog";
import getPost from "./getPost";
import Pagination, { usePagination } from "@/components/Pagination";
import { useFiltersContext } from "@/sections/Blog/ViewAll/Filters/Context";

const PAGE_SIZE = 5;

const Content = () => {
    const { filters } = useFiltersContext();
    const { data, isLoading } = useFilterBlogPostsQuery(filters);

    const content = data?.content ?? [];
    const totalItems = data?.totalElements ?? PAGE_SIZE;
    const pagination = usePagination();

    return (
        <Pagination
            isLoading={isLoading}
            pageSize={PAGE_SIZE}
            totalItems={totalItems}
            ContainerProps={{ spacing: 1 }}
            {...pagination}
        >
            {content.map(getPost)}
        </Pagination>
    );
};

export default Content;
