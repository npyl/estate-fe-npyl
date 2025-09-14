// Pagination component for server-side pagination
// WARN: MUI pagination starts from index 1; datagrids start from 0 (=> Let's say that outside of this component we use 0)

import {
    ChangeEvent,
    forwardRef,
    MouseEvent,
    useCallback,
    useEffect,
} from "react";
import { PaginationProps } from "./types";
const StyledPagination = dynamic(() => import("./styled"));
const TablePagination = dynamic(() => import("./TablePagination"));
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
    (
        {
            children,
            pageSize,
            totalItems,
            table = false,
            isLoading = false,
            ContainerProps,
            page,
            onChange,
            onPageExceedTotal,
            ...props
        },
        ref
    ) => {
        const totalPages = Math.ceil(totalItems / pageSize);

        useEffect(() => {
            window.scrollTo(0, 0); // This scrolls to the top on page change
        }, [page]);

        useEffect(() => {
            if (isLoading) return;
            if (page + 1 > totalPages && onPageExceedTotal) onPageExceedTotal();
        }, [isLoading, page, totalPages]);

        const handlePageChange = useCallback(
            (e: ChangeEvent<unknown>, p: number) => onChange?.(e, p - 1), // INFO: normalise index
            []
        );
        const handleTablePageChange = useCallback(
            (e: MouseEvent<HTMLButtonElement> | null, p: number) =>
                onChange?.(e, p), // INFO: this does not need normalisation,
            []
        );

        return (
            <Stack ref={ref} {...ContainerProps}>
                {children}

                {table ? (
                    <TablePagination
                        count={totalItems}
                        page={page}
                        rowsPerPage={pageSize}
                        onPageChange={handleTablePageChange}
                    />
                ) : null}

                {!table ? (
                    <StyledPagination
                        {...props}
                        page={page + 1}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                        count={totalPages}
                    />
                ) : null}
            </Stack>
        );
    }
);

export type { PaginationProps };
export default Pagination;
