import {
    Box,
    Collapse,
    Skeleton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableRowProps,
    Typography,
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
    onClick: () => void;
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
        <TableRow sx={{ backgroundColor: "neutral.100" }}>
            <TableCell
                style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}
                colSpan={7}
            >
                <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                        p: 0,
                        height: "580px",
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
                                <TableCell>{t("")}</TableCell>
                                <TableCell>{t("")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Stack gap={1}>
                                        <Typography
                                            textAlign="center"
                                            fontWeight="bold"
                                        >
                                            {listing?.title}
                                        </Typography>
                                    </Stack>
                                </TableCell>
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
                            marginInline={8}
                            height={"100%"}
                            sx={{ mt: 4, gap: 7 }}
                        >
                            <Box width={"25%"} alignContent={"center"}>
                                {listing?.description}
                            </Box>

                            <ListingCard item={listing} />
                        </Box>
                    )}
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

function ListingRow({ row, onRemove, loading, onClick }: ListingRowProps) {
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
                onClick={onClick}
            />
            {open ? <Collapsible id={row?.id} open={open} /> : null}
        </Fragment>
    );
}

export default ListingRow;
