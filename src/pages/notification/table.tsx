import {
    Table as MuiTable,
    Paper,
    TableBody,
    TableContainer,
    TablePagination,
} from "@mui/material";
import { ContactNotification, NotificationType } from "src/types/notification";
// rows
import ListingRow from "./row/listing";
import TourRow from "./row/tour";
import WorkApplicationRow from "./row/workApplication";
import ReviewRow from "./row/review";
import AgreementRow from "./row/agreement";
import { useMediaQuery } from "@mui/material";

interface TableProps {
    variant: NotificationType;
    rows: ContactNotification[];
    sortBy: string;
    direction: string;
    onRemove: (index: number) => void;
    loading: boolean;
    page: number;
    pageSize: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    totalRows: number;
    filter: any;
}

const Table = ({
    variant,
    rows,
    onRemove,
    loading,
    filter,
    page,
    pageSize,
    onPageChange,
    onRowsPerPageChange,
    totalRows,
}: TableProps) => {
    const RowComponent =
        variant === "LISTING"
            ? ListingRow
            : variant === "WORK_FOR_US"
            ? WorkApplicationRow
            : variant === "REVIEW"
            ? ReviewRow
            : variant === "AGREEMENT"
            ? AgreementRow
            : TourRow;

    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <TableContainer
            component={Paper}
            sx={{
                mt: 1,
                width: "100%",
                overflowX: "auto",
            }}
        >
            <MuiTable
                aria-label="collapsible table"
                sx={{
                    width: "100%",
                    "& th, & td": {
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        padding: isMobile ? "6px 12px" : "12px 44px",
                    },
                }}
            >
                <TableBody>
                    {rows.map((row, i) => (
                        <RowComponent
                            key={i}
                            row={row}
                            onRemove={() => onRemove(row.id || 0)}
                            loading={loading}
                            filter={filter}
                            onClick={() => {}}
                        />
                    ))}
                </TableBody>
            </MuiTable>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalRows}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </TableContainer>
    );
};

export default Table;
