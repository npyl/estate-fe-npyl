import { useMemo } from "react";
import {
    useFilterArchivedQuery,
    useFilterPropertiesQuery,
} from "src/services/properties";
import { IPropertyFilter } from "@/types/properties";

interface Filters extends IPropertyFilter {
    [key: string]: any;
}

type TReq = {
    filter: Filters;
    page: number;
    pageSize: number;
    sortBy: string;
    direction: string;
};

const useFilteredRows = (archived: boolean, req: TReq) => {
    const { data: data_0, isLoading: isLoading_0 } = useFilterPropertiesQuery(
        req,
        {
            skip: archived,
        }
    );

    const { data: data_1, isLoading: isLoading_1 } = useFilterArchivedQuery(
        req,
        {
            skip: !archived,
        }
    );

    const rows = useMemo(
        () =>
            Array.isArray(archived ? data_1?.content : data_0?.content)
                ? archived
                    ? data_1?.content
                    : data_0?.content
                : [],
        [archived, data_0?.content, data_1?.content]
    );

    const totalRows = (archived ? data_1 : data_0)?.totalElements ?? 10;

    return { rows, totalRows, isLoading: isLoading_0 || isLoading_1 };
};

export default useFilteredRows;
