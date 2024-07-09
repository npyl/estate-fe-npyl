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
import { useTranslation } from "react-i18next";
import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow, { getDate } from "./basic";

type TourType = "inPerson" | "inVideo";

const isLiveTour = (s?: TourType) => s === "inPerson" || s === "inVideo";

interface TourRowProps {
    row: ContactNotification;
    onRemove: () => void;
    loading: boolean;
}

function TourRow({ row, onRemove, loading }: TourRowProps) {
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
                loading={loading}
            />
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}
                    colSpan={7}
                >
                    <Collapse in={open} timeout="auto">
                        <Box sx={{ margin: 1 }}>
                            <Table
                                size="small"
                                sx={{
                                    "& .MuiTableCell-root": {
                                        borderBottom: "none",
                                        borderRadius: "0px",
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
