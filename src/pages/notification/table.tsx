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

                        {variant === "contact" || variant === "tour" ? (
                            <TableCell align="center"> {t("Type")}</TableCell>
                        ) : null}

                        {/* CODE HERE FOR FULL WIDTH OF TABLEHEAD  */}
                        {variant === "contact" ||
                        variant === "tour" ||
                        variant === "listing" ||
                        variant === "review" ||
                        variant === "workForUs" ? (
                            <TableCell align="center"> {""}</TableCell>
                        ) : null}

                        {variant === "review" ? (
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
                            onRemove={() => onRemove(row.id)}
                            onClick={() => onViewNotification(row)}
                            loading={loading}
                        />
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
