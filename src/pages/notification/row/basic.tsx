import {
    Box,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import { ContactNotification, IWorkForUs } from "src/types/notification";
import Iconify from "src/components/iconify";
import { useToggleNotificationViewedStatusMutation } from "@/services/notification";
import Link from "next/link";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { ArrowDropDown, ArrowDropUp, LocalPhone } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import { IProperties } from "@/types/properties";
import { useRouter } from "next/router";
import {
    format,
    isToday,
    isYesterday,
    isThisWeek,
    formatDistanceToNow,
    differenceInDays,
} from "date-fns";
import { ListingNotification } from "@/types/notification/listing";
export const getDate = (s?: string) => {
    if (!s) return "";
    const date = new Date(s);
    const now = new Date();

    if (isToday(date)) {
        return "Today";
    }
    if (isYesterday(date)) {
        return "Yesterday";
    }
    if (isThisWeek(date, { weekStartsOn: 1 })) {
        // If the date is within this week but not today or yesterday
        return format(date, "EEEE"); // e.g., Monday, Tuesday
    }
    if (differenceInDays(now, date) <= 7) {
        // If the date is within the last seven days but not within this week
        return format(date, "EEEE"); // e.g., Monday, Tuesday
    }

    return format(date, "d MMMM yyyy"); // e.g., 11 July 2024
};
interface BasicRowProps {
    row: ContactNotification;
    open: boolean;
    variant?: "showType" | "dontShowType";
    onToggle: () => void;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    filter: any;
    propertyDetails?: IProperties;
    contactDetails?: ListingNotification;
    workDetails?: IWorkForUs;
}

const BasicRow = ({
    variant = "dontShowType",
    row,
    open,
    onToggle,
    filter,
    onRemove,
    onClick,
    loading,
    propertyDetails,
    contactDetails,
    workDetails,
}: BasicRowProps) => {
    const router = useRouter();
    const [toggleNotificationViewedStatus] =
        useToggleNotificationViewedStatusMutation();

    const handleToggleRead = () => {
        if (filter === "viewed") return;
        if (filter === "notViewed") return;
        toggleNotificationViewedStatus(row.id!);
    };

    const handleToggleCollapsible = () => {
        onToggle();
        if (filter === "viewed") return;
        if (filter === "notViewed") return;

        if (!row.viewed) {
            toggleNotificationViewedStatus(row.id!);
        }
    };

    const handleStatusChange = (
        event: SelectChangeEvent<"Viewed" | "Not Viewed">
    ) => {
        handleToggleRead();
    };

    const handleRowClick = () => {
        router.push(`/notification/${row.id}`);
    };

    return (
        <TableRow
            sx={{
                "& > *": { borderBottom: "unset" },
                "&:hover": {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                },
            }}
            // onClick={handleRowClick}
        >
            <TableCell>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    width="100%"
                >
                    <Box>
                        <img
                            src={
                                propertyDetails?.propertyImage?.url ||
                                contactDetails?.photo ||
                                ""
                            }
                            alt={"property Image"}
                            style={{
                                width: 180,
                                height: 120,
                                borderRadius: 8,
                            }}
                        />
                        {/* <img
                            src={contactDetails?.photo || ""}
                            alt={"property Image"}
                            style={{ width: 180, height: 120, borderRadius: 8 }}
                        /> */}
                    </Box>

                    <Stack direction="column">
                        <Box>
                            <Typography fontWeight={600}>
                                {row.customerName}
                            </Typography>

                            <Box flexDirection="row">
                                <Typography variant="body2">
                                    {propertyDetails?.category?.value ||
                                        contactDetails?.category?.value}{" "}
                                    {" for "}
                                    {propertyDetails?.state?.value ||
                                        contactDetails?.state?.value}{" "}
                                    {propertyDetails?.area ||
                                        contactDetails?.area}{" "}
                                    m² |{" "}
                                    {propertyDetails?.price ||
                                        contactDetails?.price}{" "}
                                    €
                                    {propertyDetails?.state?.key === "RENT"
                                        ? "/month"
                                        : null}
                                </Typography>
                            </Box>
                            <Box flexDirection="row">
                                <Stack
                                    direction="row"
                                    gap={0.5}
                                    alignItems="center"
                                >
                                    <Typography variant="body2">
                                        {" "}
                                        {propertyDetails?.location?.complex ||
                                            contactDetails?.location
                                                ?.complex}{" "}
                                        (
                                        {propertyDetails?.location?.city ||
                                            contactDetails?.location?.city}
                                        )
                                    </Typography>

                                    {row.propertyCode ? (
                                        <>
                                            <Typography
                                                variant="body2"
                                                ml={0.5}
                                            >
                                                Property Code:{" "}
                                            </Typography>
                                            <Link
                                                href={`/property/${propertyDetails?.id}`}
                                                passHref
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="a"
                                                    sx={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                        display: "block",
                                                    }}
                                                >
                                                    {" "}
                                                    {row.propertyCode}
                                                </Typography>
                                            </Link>
                                        </>
                                    ) : null}
                                </Stack>
                            </Box>
                        </Box>
                        <Stack
                            flexDirection="row"
                            gap={2}
                            alignItems="center"
                            mt={3}
                        >
                            <Typography
                                variant="body2"
                                display="flex"
                                alignItems="center"
                            >
                                <LocalPhone
                                    sx={{
                                        color: "black",
                                        fontSize: "medium",
                                        mr: 1,
                                    }}
                                />
                                {row.customerMobile}
                            </Typography>
                            <Typography
                                variant="body2"
                                display="flex"
                                alignItems="center"
                            >
                                <EmailIcon
                                    sx={{
                                        color: "black",
                                        fontSize: "medium",
                                        mr: 1,
                                    }}
                                />
                                {row.customerEmail}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell align="right">
                <Select
                    value={row.viewed ? "Viewed" : "Not Viewed"}
                    onChange={handleStatusChange}
                    displayEmpty
                    sx={{
                        color: "black",
                        fontWeight: row.viewed ? "normal" : "bold",
                        "& .MuiSelect-select": {
                            padding: 0,
                        },
                        "&:before": {
                            border: 0,
                        },
                        "&:after": {
                            border: 0,
                        },
                        "& .MuiSvgIcon-root": {
                            right: 0,
                        },
                    }}
                    variant="standard"
                    disableUnderline
                >
                    <MenuItem value="Viewed">Viewed</MenuItem>
                    <MenuItem value="Not Viewed">Not Viewed</MenuItem>
                </Select>
                <Typography variant="body2" color="text.secondary">
                    {getDate(row.notificationDate)}
                </Typography>
            </TableCell>

            {/* THIS WILL BE VISIBLE ON HOVER ONLY */}
            {/* <TableCell align="right">
                <IconButton onClick={onRemove} disabled={loading}>
                    <Iconify icon={"eva:trash-2-outline"} />
                </IconButton>
            </TableCell> */}
        </TableRow>
    );
};

export default BasicRow;
