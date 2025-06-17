import {
    PaginationProps as MuiPaginationProps,
    StackProps,
} from "@mui/material";
import { ReactNode } from "react";

type PaginationHookProps = {
    page: number;
    onChange: (event: any, page: number) => void;
    onPageExceedTotal?: VoidFunction;
};

type Mixup = PaginationHookProps & Omit<MuiPaginationProps, "page">;

interface PaginationProps extends Mixup {
    pageSize: number;
    totalItems: number;
    isLoading: boolean; // external data is loading (use to prevent page exceed effect from firing)
    children: ReactNode;

    table?: boolean;

    ContainerProps?: StackProps;
}

export type { PaginationHookProps, PaginationProps };
