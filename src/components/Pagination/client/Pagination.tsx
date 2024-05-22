// Pagination component for client-side pagination
// WARN: MUI pagination starts from index 1; datagrids start from 0 (=> Let's say that outside of this component we use 0)

import { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";
import React, { useCallback, useEffect, useMemo } from "react";
import { ReactNode } from "react";
import StyledPagination from "../styled";
import Box from "@mui/material/Box";

interface PaginationProps<C extends React.ElementType>
    extends Omit<MuiPaginationProps, "page"> {
    pageSize: number;
    page: number;
    isLoading: boolean; // external data is loading (use to prevent page exceed effect from firing)
    children: ReactNode;
    Container?: C;
    ContainerProps?: React.ComponentProps<C>;

    onPageExceedTotal?: VoidFunction;
}

const ClientPagination = <C extends React.ElementType = "div">({
    page = 1,
    pageSize,
    isLoading = false,
    children,
    Container,
    ContainerProps,
    onChange,
    onPageExceedTotal,
    ...props
}: PaginationProps<C>) => {
    const totalItems = React.Children.count(children);
    const totalPages = Math.ceil(totalItems / pageSize);

    const displayItems = useMemo(
        () =>
            React.Children.toArray(children).slice(
                page * pageSize, // INFO: (page - 1) + 1 = page
                (page + 1) * pageSize
            ),
        [children, page, pageSize]
    );

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
                {displayItems}
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

export default ClientPagination;
