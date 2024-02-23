import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Fragment } from "react";
import { ContactNotification } from "src/types/notification";
import { useTranslation } from "react-i18next";
import BasicRow from "./basic";
import useToggle from "src/hooks/useToggle";

type TourType = "inPerson" | "inVideo";

const getDate = (s?: string) => (s ? new Date(s).toDateString() : "");
const isLiveTour = (s?: TourType) => s === "inPerson" || s === "inVideo";

interface TourRowProps {
    row: ContactNotification;
    onRemove: () => void;
}

function TourRow({ row, onRemove }: TourRowProps) {
    const { t } = useTranslation();
    const [open, toggleOpen] = useToggle(false);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="showType"
                onToggle={toggleOpen}
                onRemove={onRemove}
            />
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table
                                size="small"
                                sx={{
                                    "& .MuiTableCell-root": {
                                        borderBottom: "none",
                                        borderRadius: "5px",
                                    },
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            {t("Property Code")}
                                        </TableCell>
                                        <TableCell>{t("Message")}</TableCell>

                                        {/* Show only if we have live tour */}
                                        {isLiveTour(
                                            row.tourType as TourType
                                        ) ? (
                                            <>
                                                <TableCell>
                                                    {t("Tour Date")}
                                                </TableCell>
                                                <TableCell>
                                                    {t("Tour Time")}
                                                </TableCell>
                                            </>
                                        ) : null}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            {row.propertyCode}
                                        </TableCell>
                                        <TableCell>{row.message}</TableCell>

                                        {/* Show only if we have live tour */}
                                        {isLiveTour(
                                            row.tourType as TourType
                                        ) ? (
                                            <>
                                                <TableCell>
                                                    {getDate(row.tourDate)}
                                                </TableCell>
                                                <TableCell>
                                                    {row.tourTime}
                                                </TableCell>
                                            </>
                                        ) : null}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default TourRow;
