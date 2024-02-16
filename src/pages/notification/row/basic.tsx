import { IconButton, TableCell, TableRow } from "@mui/material";
import {
    KeyboardArrowUp as KeyboardArrowUpIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { ContactNotification } from "src/types/notification";
import Iconify from "src/components/iconify";

const getDate = (s?: string) => (s ? new Date(s).toDateString() : "");

interface BasicRowProps {
    row: ContactNotification;
    open: boolean;
    onToggle: () => void;
    onRemove: () => void;
}

const BasicRow = ({ row, open, onToggle, onRemove }: BasicRowProps) => (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={onToggle}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            {row.customerName}
        </TableCell>
        <TableCell align="right">{row.customerEmail}</TableCell>
        <TableCell align="right">{row.customerMobile}</TableCell>
        <TableCell align="right">{getDate(row.notificationDate)}</TableCell>
        <TableCell align="right">{row.tourType}</TableCell>

        <TableCell align="right">
            <IconButton onClick={onRemove} disabled>
                <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
        </TableCell>
    </TableRow>
);

export default BasicRow;
