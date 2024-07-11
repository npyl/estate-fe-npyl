import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
} from "@mui/material";
import Iconify from "src/components/iconify";
import { ContactNotification } from "src/types/notification";
import ViewedNotificationIcon from "../components/ViewedNotificationIcon";
import UnViewedNotificationIcon from "../components/UnViewedNotificationIcon";
import { useToggleNotificationViewedStatusMutation } from "@/services/notification";

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
}

const BasicRow = ({
    variant = "dontShowType",
    row,
    open,
    onToggle,
    onRemove,
    onClick,
    loading,
}: BasicRowProps) => {
    const [toggleNotificationViewedStatus] =
        useToggleNotificationViewedStatusMutation();

    const handleToggleRead = () => {
        toggleNotificationViewedStatus(row.id!);
    };

    const handleToggleCollapsible = () => {
        onToggle();

        if (!row.viewed) {
            toggleNotificationViewedStatus(row.id!);
        }
    };

    return (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
                <Stack flexDirection="row" alignItems="end" gap={1}>
                    <Box display="flex" onClick={onClick}>
                        <IconButton
                            onClick={handleToggleCollapsible}
                            size="small"
                        >
                            {open ? (
                                <KeyboardArrowUpIcon />
                            ) : (
                                <KeyboardArrowDownIcon />
                            )}
                        </IconButton>
                    </Box>

                    {row.viewed ? (
                        <Tooltip
                            title="Change to Not Seen "
                            placement="top"
                            enterDelay={800}
                            leaveDelay={100}
                            sx={{ cursor: "pointer" }}
                        >
                            <ViewedNotificationIcon
                                key={`viewed-${row.id}`}
                                onClick={handleToggleRead}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip
                            title="Change to Seen "
                            placement="top"
                            enterDelay={800}
                            leaveDelay={100}
                            sx={{ cursor: "pointer" }}
                        >
                            <UnViewedNotificationIcon
                                key={`unviewed-${row.id}`}
                                onClick={handleToggleRead}
                            />
                        </Tooltip>
                    )}
                </Stack>
            </TableCell>

            <TableCell
                sx={{
                    textOverflow: "ellipsis",
                    overflow: "auto",
                    alignItems: "center",
                    gap: 1,
                    fontWeight: "600",
                }}
                component="th"
                scope="row"
            >
                {row.customerName}
            </TableCell>
            <TableCell
                sx={{
                    textOverflow: "ellipsis",
                    overflow: "auto",
                    fontWeight: "600",
                }}
                align="center"
            >
                {row.customerEmail}
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "600" }}>
                {row.customerMobile}
            </TableCell>
            <TableCell
                align="right"
                sx={{ textWrap: "nowrap", fontWeight: "600" }}
            >
                {getDate(row.notificationDate)}
            </TableCell>
            {variant === "showType" ? (
                <TableCell align="right" sx={{ fontWeight: "600" }}>
                    {row.tourType}
                </TableCell>
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
