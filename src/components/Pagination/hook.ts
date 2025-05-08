// INFO: it is best practice to pass props generated from this hook directly to the Pagination component

import { useCallback, useState } from "react";
import { PaginationHookProps } from "./types";

type UsePagination = (_onChange?: (p: number) => void) => PaginationHookProps;

const usePagination: UsePagination = (_onChange) => {
    const [page, setPage] = useState(0);
    const onChange = useCallback(
        (_: any, p: number) => {
            setPage(p);
            _onChange?.(p);
        },
        [_onChange]
    );
    const onPageExceedTotal = useCallback(() => setPage(0), []);

    return {
        page,
        onChange,
        onPageExceedTotal,
    };
};

export default usePagination;
