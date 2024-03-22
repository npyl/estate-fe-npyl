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
// rows
import { useMemo } from "react";
import ListingRow from "./row/listing";
import TourRow from "./row/tour";
import WorkApplicationRow from "./row/workApplication";

interface TableProps {
    variant: NotificationType;
    rows: ContactNotification[];
    onRemove: (index?: number) => void;
    loading: boolean;
}

const Table = ({ variant, rows, onRemove, loading }: TableProps) => {
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
    return (
        <TableContainer
            component={Paper}
            sx={{
                mt: 1,
            }}
        >
            <MuiTable
                aria-label="collapsible table"
                sx={{ tableLayout: "fixed" }}
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variant === "listing"
                        ? rows.map((row, i) => (
                              <ListingRow
                                  key={i}
                                  row={row}
                                  onRemove={() => onRemove(row.id)}
                                  loading={loading}
                              />
                          ))
                        : variant === "workForUs"
                        ? rows.map((row, i) => (
                              <WorkApplicationRow
                                  key={i}
                                  row={row}
                                  onRemove={() => onRemove(row.id)}
                                  loading={loading}
                              />
                          ))
                        : rows.map((row, i) => (
                              <TourRow
                                  key={i}
                                  row={row}
                                  onRemove={() => onRemove(row.id)}
                                  loading={loading}
                              />
                          ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
