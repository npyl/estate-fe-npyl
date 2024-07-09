import {
    Table as MuiTable,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
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
    onRemove: (index?: number) => void;
    loading: boolean;
    onViewNotification: (notification: ContactNotification) => void;
}

const Table = ({
    variant,
    rows,
    onRemove,
    loading,
    onViewNotification,
}: TableProps) => {
    const { t } = useTranslation();

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
        variant === "listing"
            ? ListingRow
            : variant === "workForUs"
            ? WorkApplicationRow
            : variant === "review"
            ? ReviewRow
            : TourRow;

    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <TableContainer
            component={Paper}
            sx={{
                mt: 1,
            }}
        >
            <MuiTable
                aria-label="collapsible table"
                sx={{
                    "& th, & td": {
                        fontSize: isMobile ? "0.8rem" : "1rem",
                        padding: isMobile ? "6px 24px" : "16px 48px", // Increase padding for larger column spaces
                    },
                }}
            >
                <TableHead>
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
                        {variant === "contact" || variant === "tour" ? (
                            <TableCell align="right"> {t("Type")}</TableCell>
                        ) : null}
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow
                            key={i}
                            onClick={() => {
                                console.log(`Viewed: ${row.viewed}`);
                                onViewNotification(row);
                            }}
                        >
                            <RowComponent
                                key={i}
                                row={row}
                                onRemove={() => onRemove(row.id)}
                                loading={loading}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
