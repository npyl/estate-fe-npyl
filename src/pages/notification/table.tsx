import {
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { ContactNotification, NotificationType } from "src/types/notification";
import { useTranslation } from "react-i18next";
// rows
import TourRow from "./row/tour";
import ListingRow from "./row/listing";
import WorkApplicationRow from "./row/workApplication";

const COLUMNS: string[] = ["Name", "Email", "Mobile", "Notification Date"];

interface TableProps {
    variant: NotificationType;
    rows: ContactNotification[];
    onRemove: (index: number) => void;
}

const Table = ({ variant, rows, onRemove }: TableProps) => {
    const { t } = useTranslation();

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
                                  onRemove={() => onRemove(i)}
                              />
                          ))
                        : variant === "workForUs"
                        ? rows.map((row, i) => (
                              <WorkApplicationRow
                                  key={i}
                                  row={row}
                                  onRemove={() => onRemove(i)}
                              />
                          ))
                        : rows.map((row, i) => (
                              <TourRow
                                  key={i}
                                  row={row}
                                  onRemove={() => onRemove(i)}
                              />
                          ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};

export default Table;
