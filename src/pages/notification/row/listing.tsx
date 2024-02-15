import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { Fragment, useState } from "react";
import { ListingNotification } from "src/types/notification";
import Iconify from "src/components/iconify";
import { ListingCard } from "./card";

interface ListingRowProps {
    row: ListingNotification;
    onRemove: () => void;
}

function ListingRow({ row, onRemove }: ListingRowProps) {
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
                    {row?.fullName}
                </TableCell>
                <TableCell align="right">{row?.email}</TableCell>
                <TableCell align="right">{row?.mobilePhone}</TableCell>
                <TableCell align="right">{row?.parentCategory}</TableCell>
                <TableCell align="right">{row?.category}</TableCell>
                <TableCell align="right">{row?.state}</TableCell>

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
                        <ListingCard item={row} />
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default ListingRow;
