import {
    Box,
    Collapse,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { CodeBadge } from "../components/CodeBadge";
import Link from "next/link";
import { useGetPropertyByCodeQuery } from "@/services/properties";

interface ReviewRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    filter: any;
}

function ReviewRow({
    row,
    onRemove,
    loading,
    onClick,
    filter,
}: ReviewRowProps) {
    const { t } = useTranslation();
    const [open, toggleOpen] = useToggle(false);
    const { data: review } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id && !open,
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.reviewDetails,
            isLoading,
        }),
    });

    const { data: property } = useGetPropertyByCodeQuery(row.propertyCode);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="showType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                filter={filter}
                loading={loading}
                onClick={onClick}
            />
            <TableRow>
                <TableCell
                    style={{
                        padding: 0,
                    }}
                    colSpan={7}
                >
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        sx={{ backgroundColor: "neutral.100" }}
                    >
                        <Box sx={{ margin: 1, pb: 2 }}>
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
                                        <TableCell align="center">
                                            {t("Name")}
                                        </TableCell>
                                        <TableCell align="center">
                                            {t("Email")}
                                        </TableCell>
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
                                        <TableCell>
                                            <CodeBadge
                                                name={`${t("")} ${
                                                    review?.name || ""
                                                }`}
                                                color={"#3366ff"}
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "aliceblue",
                                                    width: "100%",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <CodeBadge
                                                name={`${t("")} ${
                                                    review?.email || ""
                                                }`}
                                                color={"#3366ff"}
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "aliceblue",
                                                    width: "100%",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                href={`/property/${property?.id}`}
                                                passHref
                                            >
                                                <Typography
                                                    component="a"
                                                    sx={{
                                                        textDecoration: "none",
                                                        color: "aliceblue",
                                                        "&:hover": {
                                                            color: "black",
                                                        },
                                                    }}
                                                >
                                                    <CodeBadge
                                                        name={`${t("")} ${
                                                            row.propertyCode ||
                                                            ""
                                                        }`}
                                                        color={"#3366ff"}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: "aliceblue",
                                                            width: "75%",
                                                            "&:hover": {
                                                                opacity: 1.1,
                                                            },
                                                        }}
                                                    />
                                                </Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Rating
                                                name="property-rating"
                                                value={
                                                    review?.presentationRating ||
                                                    0
                                                }
                                                readOnly
                                                precision={0.5}
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Rating
                                                name="property-rating"
                                                value={
                                                    review?.propertyRating || 0
                                                }
                                                readOnly
                                                precision={0.5}
                                            />
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
