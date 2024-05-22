import { PaginationProps as MuiPaginationProps } from "@mui/material/Pagination";
import React, { useEffect } from "react";
import { ReactNode } from "react";
import StyledPagination from "./styled";
import Box from "@mui/material/Box";

interface PaginationProps<C extends React.ElementType>
    extends Omit<MuiPaginationProps, "page"> {
    pageSize: number;
    page: number;
    totalItems: number;
    isLoading: boolean; // external data is loading (use to prevent page exceed effect from firing)
    children: ReactNode;
    Container?: C;
    ContainerProps?: React.ComponentProps<C>;

    onPageExceedTotal?: VoidFunction;
}

const Pagination = <C extends React.ElementType = "div">({
    children,
    Container,
    pageSize,
    totalItems,
    isLoading = false,
    ContainerProps,
    onPageExceedTotal,
    ...props
}: PaginationProps<C>) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    useEffect(() => {
        if (isLoading) return;
        if (props.page > totalPages && onPageExceedTotal) onPageExceedTotal();
    }, [isLoading, props.page, totalPages]);

    return (
        <>
            <Box component={Container} {...ContainerProps}>
                {children}
            </Box>

            <StyledPagination
                {...props}
                variant="outlined"
                color="primary"
                count={totalPages}
            />
        </>
    );
};

export default Pagination;
