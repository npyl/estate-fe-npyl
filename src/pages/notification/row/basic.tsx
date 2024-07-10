import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/iconify";
import { ContactNotification } from "src/types/notification";
import ViewedNotificationIcon from "../components/ViewedNotificationIcon";
import UnViewedNotificationIcon from "../components/UnViewedNotificationIcon";

export const getDate = (s?: string) =>
    s ? new Date(s).toISOString().split("T")[0] : "";

interface BasicRowProps {
    row: ContactNotification;
    open: boolean;
    variant?: "showType" | "dontShowType";
    onToggle: () => void;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    // onViewToggle: (notification: ContactNotification) => void;
}

const BasicRow = ({
    variant = "dontShowType",
    row,
    open,
    onToggle,
    onRemove,
    onClick,
    loading,
}: // onViewToggle,
BasicRowProps) => {
    const handleViewToggle = (event: React.MouseEvent) => {
        event.stopPropagation();
        // onViewToggle(row);
    };
    return (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }} onClick={onClick}>
            <TableCell>
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                        onClick={onToggle}
                        size="small"
                        // onClick={(e) => {
                        //     e.stopPropagation();
                        //     onToggle();
                        // }}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>

                    {row.viewed ? (
                        <ViewedNotificationIcon
                            key={`viewed-${row.id}`}
                            onClick={handleViewToggle}
                        />
                    ) : (
                        <UnViewedNotificationIcon
                            key={`unviewed-${row.id}`}
                            onClick={handleViewToggle}
                        />
                    )}
                </Box>
            </TableCell>

            <TableCell
                sx={{
                    textOverflow: "ellipsis",
                    overflow: "auto",
                    alignItems: "center",
                    gap: 1,
                }}
                component="th"
                scope="row"
            >
                {row.customerName}
            </TableCell>
            <TableCell
                sx={{ textOverflow: "ellipsis", overflow: "auto" }}
                align="center"
            >
                {row.customerEmail}
            </TableCell>
            <TableCell align="center">{row.customerMobile}</TableCell>
            <TableCell align="right" sx={{ textWrap: "nowrap" }}>
                {getDate(row.notificationDate)}
            </TableCell>
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
};

export default BasicRow;
