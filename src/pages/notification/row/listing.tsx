import {
    Box,
    Collapse,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import useToggle from "src/hooks/useToggle";
import { useGetNotificationByIdQuery } from "src/services/notification";
import { ContactNotification } from "src/types/notification";
import BasicRow from "./basic";
import { ListingCard } from "./card";

interface ListingRowProps {
    row: ContactNotification;
    onRemove: () => void;
    loading: boolean;
}

interface CollapsibleProps {
    id?: number;
    open: boolean;
}

const Collapsible = ({ id, open }: CollapsibleProps) => {
    const { t } = useTranslation();

    const { data: listing, isLoading } = useGetNotificationByIdQuery(id!, {
        skip: !id && !open,
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.listingDetails,
            isLoading,
        }),
    });

    return (
        <TableRow>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}
                colSpan={6}
            >
                <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        p: 2,
                        height: "600px",
                    }}
                >
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
                                <TableCell>{t("Title")}</TableCell>
                                <TableCell>{t("Description")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{listing?.title}</TableCell>
                                <TableCell>{listing?.description}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {isLoading ? (
                        <Skeleton animation="wave" width="50%" height="50px" />
                    ) : (
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"center"}
                            height={"100%"}
                        >
                            <ListingCard item={listing} />
                        </Box>
                    )}
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

function ListingRow({ row, onRemove, loading }: ListingRowProps) {
    const [open, toggleOpen] = useToggle(false);

    return (
        <Fragment>
            <BasicRow
                row={row}
                open={open}
                variant="dontShowType"
                onToggle={toggleOpen}
                onRemove={onRemove}
                loading={loading}
            />
            {open ? <Collapsible id={row?.id} open={open} /> : null}
        </Fragment>
    );
}

export default ListingRow;
