import BasePagination, {
    PaginationProps as BasePaginationProps,
} from "@/components/Pagination";
import { Children, FC, useRef } from "react";
import { Box, Stack, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";
import useAvailableHeight from "@/hooks/useAvailableHeight";

const getStackSx = (hasRows: boolean): SxProps<Theme> => ({
    ".MuiTablePagination-root": {
        borderBottom: hasRows ? "1px solid" : undefined,
        borderColor: getBorderColor,
    },

    ".MuiTablePagination-selectLabel": {
        display: "none",
    },
    ".MuiTablePagination-select": {
        display: "none",
    },
    ".MuiInputBase-root": {
        display: "none",
    },

    mt: 1,
    borderRadius: 1,
    bgcolor: "background.paper",
    boxShadow: 5,
    border: "1px solid",
    borderColor: getBorderColor,
});

interface PaginationProps
    extends Omit<BasePaginationProps, "ref" | "Container" | "ContainerProps"> {}

const Pagination: FC<PaginationProps> = ({ children, ...props }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    useAvailableHeight(boxRef, rootRef);

    const hasRows = Children.count(children) > 0;

    return (
        <BasePagination
            ref={rootRef}
            table
            Container={Stack}
            ContainerProps={{
                flexDirection: "column-reverse",
                sx: getStackSx(hasRows),
            }}
            {...props}
        >
            <Box ref={boxRef} overflow="hidden auto">
                {children}
            </Box>
        </BasePagination>
    );
};

export default Pagination;
