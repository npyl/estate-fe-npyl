import {
    Table as MuiTable,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ContactNotification, NotificationType } from "src/types/notification";
import { useMemo } from "react";
// rows
import ListingRow from "./row/listing";
import TourRow from "./row/tour";
import WorkApplicationRow from "./row/workApplication";
import ReviewRow from "./row/review";

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
    const { t } = useTranslation();
    console.log(filter);
    const COLUMNS: string[] = useMemo(
        () => [
            t("Name"),
            t("Email"),
            t("Mobile Phone"),
            t("Notification Date"),
        ],
        [t]
    );

    const RowComponent =
        variant === "LISTING"
            ? ListingRow
            : variant === "WORK_FOR_US"
            ? WorkApplicationRow
            : variant === "REVIEW"
            ? ReviewRow
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
                <TableHead sx={{ width: "100%" }}>
                    <TableRow>
                        <TableCell />
                        {COLUMNS.map((c, i) => (
                            <TableCell
                                align={
                                    i === 0
                                        ? "left"
                                        : i === COLUMNS.length - 1
                                        ? "right"
                                        : "center"
                                }
                                key={i}
                            >
                                {t(c)}
                            </TableCell>
                        ))}

                        {variant === "CONTACT" || variant === "TOUR" ? (
                            <TableCell align="center"> {t("Type")}</TableCell>
                        ) : null}

                        {/* CODE HERE FOR FULL WIDTH OF TABLEHEAD  */}
                        {variant === "CONTACT" ||
                        variant === "TOUR" ||
                        variant === "LISTING" ||
                        variant === "REVIEW" ||
                        variant === "WORK_FOR_US" ? (
                            <TableCell align="center"> {""}</TableCell>
                        ) : null}

                        {variant === "REVIEW" ? (
                            <TableCell align="center"> {""}</TableCell>
                        ) : null}
                        {/* CODE HERE FOR FULL WIDTH OF TABLEHEAD  */}
                    </TableRow>
                </TableHead>

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
