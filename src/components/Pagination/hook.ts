// INFO: it is best practice to pass props generated from this hook directly to the Pagination component

import { useCallback, useState } from "react";
import { PaginationHookProps } from "./types";

const usePagination = (): PaginationHookProps => {
    const [page, setPage] = useState(0);
    const onChange = useCallback((_: any, p: number) => setPage(p), []);
    const onPageExceedTotal = useCallback(() => setPage(0), []);

    return {
        page,
        onChange,
        onPageExceedTotal,
    };
};

export default usePagination;
