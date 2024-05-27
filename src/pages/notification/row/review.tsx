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
import {
    useGetNotificationByIdQuery,
    useGetNotificationsQuery,
} from "@/services/notification";

interface ReviewRowProps {
    row: ContactNotification;
    onRemove: () => void;
    loading: boolean;
}

function ReviewRow({ row, onRemove, loading }: ReviewRowProps) {
    const { t } = useTranslation();
    const [open, toggleOpen] = useToggle(false);
    const { data: review, isLoading } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id && !open,
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.reviewDetails,
            isLoading,
        }),
    });

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
                    <Collapse in={open} timeout="auto" unmountOnExit>
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
                                        <TableCell>{t("Name")}</TableCell>
                                        <TableCell>{t("Email")}</TableCell>
                                        <TableCell>
                                            {t("Property Code")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Property presentation Rate")}
                                        </TableCell>
                                        <TableCell>
                                            {t("Property Rating")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{review?.name}</TableCell>
                                        <TableCell>{review?.email}</TableCell>
                                        <TableCell>
                                            {row?.propertyCode}
                                        </TableCell>
                                        <TableCell>
                                            {review?.presentationRating}
                                        </TableCell>
                                        <TableCell>
                                            {review?.propertyRating}
                                        </TableCell>
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

export default ReviewRow;
