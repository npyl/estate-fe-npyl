import {
    Box,
    Collapse,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ContactNotification } from "@/types/notification";
import BasicRow from "./basic";
import { useGetNotificationByIdQuery } from "@/services/notification";
import { useGetPropertyByCodeQuery } from "@/services/properties";
import { NormalBadge } from "@/ui/Cards/PropertyCard/styled";
import CodeBadgeLink from "@/ui/Property/CodeBadgeLink";

interface ReviewRowProps {
    row: ContactNotification;
    filter: any;
}

const ReviewRow = ({ row, filter }: ReviewRowProps) => {
    const { t } = useTranslation();
    const { data: review } = useGetNotificationByIdQuery(row.id!, {
        skip: !row.id,
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.reviewDetails,
            isLoading,
        }),
    });

    const { data: property } = useGetPropertyByCodeQuery(row.propertyCode);

    return (
        <Fragment>
            <BasicRow row={row} filter={filter} />
            <TableRow>
                <TableCell
                    style={{
                        padding: 0,
                    }}
                    colSpan={7}
                >
                    <Collapse
                        in
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
                                            <NormalBadge
                                                name={`${t("")} ${
                                                    review?.name || ""
                                                }`}
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "aliceblue",
                                                    width: "100%",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <NormalBadge
                                                name={`${t("")} ${
                                                    review?.email || ""
                                                }`}
                                                sx={{
                                                    fontWeight: "bold",
                                                    color: "aliceblue",
                                                    width: "100%",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <CodeBadgeLink
                                                propertyId={property?.id!}
                                                code={row.propertyCode}
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Rating
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
};

export default ReviewRow;
