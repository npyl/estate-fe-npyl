// INFO: it is best practice to pass props generated from this hook directly to the Pagination component

import { useCallback, useState } from "react";

const usePagination = () => {
    const [page, setPage] = useState(0);
    const onPageChange = useCallback((_: any, p: number) => setPage(p), []);
    const onPageExceed = useCallback(() => setPage(0), []);

    return {
        page,
        onPageChange,
        onPageExceed,
    };
};

export default usePagination;
