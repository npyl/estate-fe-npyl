import { PaginationProps as MuiPaginationProps } from "@mui/material";
import { ReactNode } from "react";

export type PaginationHookProps = {
    page: number;
    onChange: (event: any, page: number) => void;
    onPageExceedTotal?: VoidFunction;
};

type Mixup = PaginationHookProps & Omit<MuiPaginationProps, "page">;

export interface PaginationProps<C extends React.ElementType> extends Mixup {
    pageSize: number;
    totalItems: number;
    isLoading: boolean; // external data is loading (use to prevent page exceed effect from firing)
    children: ReactNode;
    Container?: C;
    ContainerProps?: React.ComponentProps<C>;
}
