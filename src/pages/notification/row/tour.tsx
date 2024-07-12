import {
    Box,
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Fragment } from "react";
import Link from "next/link";

import { useTranslation } from "react-i18next";
import useToggle from "src/hooks/useToggle";
import { ContactNotification } from "src/types/notification";
import BasicRow, { getDate } from "./basic";
import { CodeBadge } from "../components/CodeBadge";
import { useGetPropertyByCodeQuery } from "@/services/properties";
type TourType = "inPerson" | "inVideo";

const isLiveTour = (s?: TourType) => s === "inPerson" || s === "inVideo";

interface TourRowProps {
    row: ContactNotification;
    onRemove: () => void;
    onClick: () => void;
    filter: any;
    loading: boolean;
}

function TourRow({ row, onRemove, loading, onClick, filter }: TourRowProps) {
    const { t } = useTranslation();
    const [open, toggleOpen] = useToggle(false);

    console.log("filter: ", filter);

    // const [getAllProperties ] =
    const { data: property } = useGetPropertyByCodeQuery(row.propertyCode);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                filter={filter}
                variant="showType"
                onToggle={toggleOpen}
                onRemove={onRemove}
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
                        sx={{ p: 2, backgroundColor: "neutral.100" }}
                    >
                        <Box
                            sx={{
                                margin: 1,
                            }}
                        >
                            <Table
                                size="small"
                                sx={{
                                    "& .MuiTableCell-root": {
                                        borderBottom: "none",
                                        borderRadius: "0px",
                                        padding: "10px",
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
                                                            width: "25%",
                                                            "&:hover": {
                                                                opacity: 1.1,
                                                            },
                                                        }}
                                                    />
                                                </Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.message ? (
                                                <CodeBadge
                                                    name={`${t("")} ${
                                                        row.message
                                                    }`}
                                                    color={"#3366ff"}
                                                    sx={{
                                                        fontWeight: "bold",
                                                        color: "aliceblue",
                                                        width: "27%",
                                                    }}
                                                />
                                            ) : null}
                                        </TableCell>

                                        {/* Show only if we have live tour */}
                                        {isLiveTour(
                                            row.tourType as TourType
                                        ) ? (
                                            <>
                                                <TableCell>
                                                    <CodeBadge
                                                        name={`${t("")} ${
                                                            getDate(
                                                                row.tourDate
                                                            ) || ""
                                                        }`}
                                                        color={"#3366ff"}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: "aliceblue",
                                                            width: "35%",
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <CodeBadge
                                                        name={`${t("")} ${
                                                            row.tourTime
                                                        }`}
                                                        color={"#3366ff"}
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: "aliceblue",
                                                            width: "35%",
                                                        }}
                                                    />
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
