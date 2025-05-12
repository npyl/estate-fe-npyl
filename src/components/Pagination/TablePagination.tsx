import MuiTablePagination, {
    TablePaginationProps as MuiTablePaginationProps,
} from "@mui/material/TablePagination";
import { FC } from "react";

interface TablePaginationProps
    extends Omit<MuiTablePaginationProps<"div">, "component"> {}

const TablePagination: FC<TablePaginationProps> = (props) => (
    <MuiTablePagination component="div" {...props} />
);

export default TablePagination;
