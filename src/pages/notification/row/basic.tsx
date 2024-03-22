import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/iconify";
import { ContactNotification } from "src/types/notification";

export const getDate = (s?: string) =>
    s ? new Date(s).toISOString().split("T")[0] : "";

interface BasicRowProps {
    row: ContactNotification;
    open: boolean;
    variant?: "showType" | "dontShowType";
    onToggle: () => void;
    onRemove: () => void;
    loading: boolean;
}

const BasicRow = ({
    variant = "dontShowType",
    row,
    open,
    onToggle,
    onRemove,
    loading,
}: BasicRowProps) => (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={onToggle}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
        <TableCell
            sx={{ textOverflow: "ellipsis", overflow: "auto" }}
            component="th"
            scope="row"
        >
            {row.customerName}
        </TableCell>
        <TableCell
            sx={{ textOverflow: "ellipsis", overflow: "auto" }}
            align="right"
        >
            {row.customerEmail}
        </TableCell>
        <TableCell align="right">{row.customerMobile}</TableCell>
        <TableCell align="right">{getDate(row.notificationDate)}</TableCell>
        {variant === "showType" ? (
            <TableCell align="right">{row.tourType}</TableCell>
        ) : null}

        <TableCell align="right">
            <IconButton onClick={onRemove} disabled={loading}>
                <Iconify icon={"eva:trash-2-outline"} />
            </IconButton>
        </TableCell>
    </TableRow>
);

export default BasicRow;
