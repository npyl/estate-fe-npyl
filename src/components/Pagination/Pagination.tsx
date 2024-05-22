// Pagination component for server-side pagination
// WARN: MUI pagination starts from index 1; datagrids start from 0 (=> Let's say that outside of this component we use 0)

import React, { useCallback, useEffect } from "react";
import StyledPagination from "./styled";
import Box from "@mui/material/Box";
import { PaginationProps } from "./types";

const Pagination = <C extends React.ElementType = "div">({
    children,
    Container,
    pageSize,
    totalItems,
    isLoading = false,
    ContainerProps,
    page,
    onChange,
    onPageExceedTotal,
    ...props
}: PaginationProps<C>) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        if (isLoading) return;
        if (page + 1 > totalPages && onPageExceedTotal) onPageExceedTotal();
    }, [isLoading, page, totalPages]);

    const handlePageChange = useCallback(
        (_: any, p: number) => onChange?.(_, p - 1), // INFO: normalise index
        []
    );

    return (
        <>
            <Box component={Container} {...ContainerProps}>
                {children}
            </Box>

            <StyledPagination
                {...props}
                page={page + 1}
                onChange={handlePageChange}
                variant="outlined"
                color="primary"
                count={totalPages}
            />
        </>
    );
};

export default Pagination;
