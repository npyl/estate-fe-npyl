import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import {
    ContactNotification,
    ListingNotification,
    NotificationType,
} from "src/types/notification";
import { useTranslation } from "react-i18next";
import TourRow from "./row/tour";
import ListingRow from "./row/listing";

const COLUMNS: Record<NotificationType, string[]> = {
    contact: ["Name", "Email", "Mobile", "Notification Date", "Type"],

    listing: [
        "Full Name",
        "Email",
        "Mobile",
        "Parent Category",
        "Category",
        "State",
    ],

    tour: [],
};

interface TableProps {
    variant: NotificationType;
    rows: (ListingNotification | ContactNotification)[];
    onRemove: (index: number) => void;
}

const CollapsibleTable = ({ variant, rows, onRemove }: TableProps) => {
    const { t } = useTranslation();

    return (
        <TableContainer
            component={Paper}
            sx={{
                mt: 1,
            }}
        >
            <Table aria-label="collapsible table" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {COLUMNS[variant].map((c, i) => (
                            <TableCell
                                align={
                                    i === 0
                                        ? "left"
                                        : i === COLUMNS[variant].length - 1
                                        ? "right"
                                        : "center"
                                }
                                key={i}
                            >
                                {t(c)}
                            </TableCell>
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {variant === "listing"
                        ? rows.map((row, i) => (
                              <ListingRow
                                  key={i}
                                  row={row as ListingNotification}
                                  onRemove={() => onRemove(i)}
                              />
                          ))
                        : rows.map((row, i) => (
                              <TourRow
                                  key={i}
                                  row={row as ContactNotification}
                                  onRemove={() => onRemove(i)}
                              />
                          ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CollapsibleTable;
