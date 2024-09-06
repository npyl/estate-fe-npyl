import { useMemo } from "react";
import { useSearchPropertyQuery } from "@/services/properties";
import { PaginationHookProps } from "@/components/Pagination/types";
import { pageSize } from "./constants";

const useSearchContent = (
    pagination: PaginationHookProps,
    searchString: string,
    customerId?: number
) => {
    const { data, isLoading } = useSearchPropertyQuery({
        searchString,
        page: pagination.page,
        pageSize,
        customer: customerId,
    });

    const content = useMemo(
        () => (Array.isArray(data?.content) ? data.content : []),
        [data?.content]
    );

    return {
        content,
        isLoading,
        totalElements: data?.totalElements || 0,
    };
};

export { useSearchContent };
