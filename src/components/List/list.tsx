import { List as MuiList, ListProps as MuiListProps } from "@mui/material";
import type { FC, ReactNode } from "react";

interface ListProps extends MuiListProps {
    children: ReactNode;
}

const List: FC<ListProps> = ({ children, ...props }) => (
    <MuiList disablePadding {...props}>
        {children}
    </MuiList>
);

export default List;
