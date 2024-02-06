import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { Fragment, useState } from "react";
import { ContactNotification } from "src/types/notification";
import Iconify from "src/components/iconify";
import { useTranslation } from "react-i18next";

type TourType = "inPerson" | "inVideo";

const getDate = (s?: string) => (s ? new Date(s).toDateString() : "");
const isLiveTour = (s?: TourType) => s === "inPerson" || s === "inVideo";

function Row(props: { row: ContactNotification; onRemove: () => void }) {
    const { row, onRemove } = props;

    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.customerName}
                </TableCell>
                <TableCell align="right">{row.customerEmail}</TableCell>
                <TableCell align="right">{row.customerMobile}</TableCell>
                <TableCell align="right">
                    {getDate(row.notificationDate)}
                </TableCell>
                <TableCell align="right">{row.tourType}</TableCell>

                <TableCell align="right">
                    <IconButton onClick={onRemove} disabled>
                        <Iconify icon={"eva:trash-2-outline"} />
                    </IconButton>
                </TableCell>
            </TableRow>
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

export const CollapsibleTable = (props: {
    rows: ContactNotification[];
    onRemove: (index: number) => void;
}) => {
    const { rows, onRemove } = props;
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
                        <TableCell align="left">{t("Name")}</TableCell>
                        <TableCell align="center">{t("Email")}</TableCell>
                        <TableCell align="center">{t("Mobile")}</TableCell>
                        <TableCell align="center">
                            {t("Notification Date")}
                        </TableCell>
                        <TableCell align="right">{t("Type")}</TableCell>

                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row
                            key={index}
                            row={row}
                            onRemove={() => onRemove(index)}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
