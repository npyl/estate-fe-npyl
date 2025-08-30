import BasePagination, {
    PaginationProps as BasePaginationProps,
} from "@/components/Pagination";
import { FC, useRef } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import getBorderColor from "@/theme/borderColor";
import useAvailableHeight from "@/hooks/useAvailableHeight";

const StackSx: SxProps<Theme> = {
    ".MuiTablePagination-root": {
        boxShadow: 5,
        overflow: "visible",
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

    borderRadius: 1,
    bgcolor: "background.paper",
    boxShadow: 5,
    border: "1px solid",
    borderColor: getBorderColor,
};

interface PaginationProps
    extends Omit<BasePaginationProps, "ref" | "Container" | "ContainerProps"> {}

const Pagination: FC<PaginationProps> = ({ children, ...props }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    useAvailableHeight(rootRef);

    return (
        <BasePagination
            ref={rootRef}
            table
            ContainerProps={{
                flexDirection: "column-reverse",
                sx: StackSx,
            }}
            {...props}
        >
            <Box overflow="hidden auto">{children}</Box>
        </BasePagination>
    );
};

export default Pagination;
