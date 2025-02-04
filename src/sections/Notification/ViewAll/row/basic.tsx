import {
    Box,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import { ContactNotification, IWorkForUs } from "src/types/notification";
import { useToggleNotificationViewedStatusMutation } from "@/services/notification";
import {
    format,
    isToday,
    isYesterday,
    isThisWeek,
    differenceInDays,
} from "date-fns";
import { ListingNotification } from "@/types/notification/listing";
import { NormalBadge } from "@/components/Cards/PropertyCard/styled";
import { useTranslation } from "react-i18next";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PropertyRegion from "./components/PropertyRegion";
import CustomerInfo from "./components/CustomerInfo";
import PropertyDetails from "./components/PropertyDetails";
import ExpireIcon from "@mui/icons-material/AccessTime"; // Import an appropriate icon
import ExpiredIcon from "@mui/icons-material/Error";
import { el, enUS } from "date-fns/locale";
import Link from "@/components/Link";

export const getDate = (s?: string, language?: string) => {
    if (!s) return "";
    const date = new Date(s);
    const now = new Date();

    // Determine locale based on the language
    const locale = language === "el" ? el : enUS;

    if (isToday(date)) {
        return language === "el" ? "Σήμερα" : "Today";
    }
    if (isYesterday(date)) {
        return language === "el" ? "Χθες" : "Yesterday";
    }
    if (isThisWeek(date, { weekStartsOn: 1 })) {
        // If the date is within this week but not today or yesterday
        return format(date, "EEEE", { locale }); // e.g., Monday, Tuesday in respective language
    }
    if (differenceInDays(now, date) <= 7) {
        // If the date is within the last seven days but not within this week
        return format(date, "EEEE", { locale }); // e.g., Monday, Tuesday
    }

    return format(date, "d MMMM yyyy", { locale }); // e.g., 11 July 2024 or 11 Ιουλίου 2024
};

interface BasicRowProps {
    row: ContactNotification;
    open: boolean;
    onToggle: () => void;
    onRemove: () => void;
    onClick: () => void;
    loading: boolean;
    filter: any;
    contactDetails?: ListingNotification;
    workDetails?: IWorkForUs;
}

const BasicRow = ({
    row,
    filter,
    contactDetails,
    workDetails,
}: BasicRowProps) => {
    const { t, i18n } = useTranslation();

    const theme = useTheme();
    const [toggleNotificationViewedStatus] =
        useToggleNotificationViewedStatusMutation();

    const handleToggleRead = () => {
        if (filter === "Viewed") return;
        if (filter === "NotViewed") return;
        toggleNotificationViewedStatus(row.id!);
    };

    const handleStatusChange = (
        event: SelectChangeEvent<"Viewed" | "Not Viewed">
    ) => {
        event.stopPropagation(); // Prevent row click event
        handleToggleRead();
    };

    const handleRowClick = () => {
        if (!row.viewed) {
            toggleNotificationViewedStatus(row.id!);
        }
    };

    const handlePropertyCodeClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent row click event
    };

    const handleCustomerNameClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevent row click event
    };

    const propertyDetails = row?.property;
    const type = row?.type?.key;

    const { customerEmail, customerMobile, tourType, tourDate, tourTime } =
        row || {};

    return (
        <TableRow
            sx={{
                "& > *": { borderBottom: "unset" },
                "&:hover": {
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                },
                backgroundColor: !row.viewed
                    ? theme.palette.mode === "dark"
                        ? "neutral.800"
                        : "neutral.100"
                    : "transparent",
                border: "1px solid lightgray",
            }}
        >
            <Link
                href={`/notification/${row.id}`}
                onClick={handleRowClick}
                display="flex"
                justifyContent="space-between"
            >
                <TableCell>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        width="100%"
                    >
                        {propertyDetails?.thumbnail || contactDetails ? (
                            <Box>
                                <img
                                    src={
                                        propertyDetails?.thumbnail ||
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
                            </Box>
                        ) : null}

                        <Stack direction="column">
                            <Box>
                                <Typography fontWeight={600}>
                                    {row.customerName}
                                </Typography>
                                {type === "TOUR" ||
                                type === "LISTING" ||
                                type === "REVIEW" ? (
                                    <>
                                        <PropertyDetails
                                            propertyDetails={propertyDetails}
                                            contactDetails={contactDetails}
                                        />
                                        <PropertyRegion
                                            propertyDetails={propertyDetails}
                                            contactDetails={contactDetails}
                                            row={row}
                                            handlePropertyCodeClick={
                                                handlePropertyCodeClick
                                            }
                                        />
                                    </>
                                ) : type === "WORK_FOR_US" ? (
                                    <Box>
                                        <Typography>{row.message}</Typography>
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            mt={0.5}
                                        >
                                            <LocationOnOutlinedIcon fontSize="small" />{" "}
                                            {workDetails?.workRegion ? (
                                                <Typography>
                                                    {
                                                        workDetails?.workRegion
                                                            ?.nameGR
                                                    }
                                                </Typography>
                                            ) : null}
                                        </Box>
                                    </Box>
                                ) : type === "AGREEMENT" ? ( // TODO: See if the AgreementDetails component  is working as expected
                                    <>
                                        <Typography fontWeight="bold">
                                            {row?.agreement?.title}
                                        </Typography>
                                        <Box>
                                            <Typography
                                                variant="body2"
                                                mt={0.5}
                                            >
                                                {row?.message}
                                            </Typography>

                                            <Stack
                                                direction="row"
                                                mt={0.5}
                                                gap={0.5}
                                                alignItems="center"
                                            >
                                                <Typography variant="body2">
                                                    For property with{" "}
                                                </Typography>
                                                <Link
                                                    href={`/property/${row?.agreement?.property?.id}`}
                                                    passHref
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <NormalBadge
                                                        name={`${t("Code")}: ${
                                                            row?.agreement
                                                                ?.property
                                                                ?.code || ""
                                                        }`}
                                                        color={"#ffcc00"}
                                                        sx={{
                                                            color: (theme) =>
                                                                theme.palette
                                                                    .mode ===
                                                                "light"
                                                                    ? "#854D0E" // Fallback to grey if neutral is undefined
                                                                    : "null",

                                                            "&:hover": {
                                                                backgroundColor:
                                                                    (theme) =>
                                                                        theme
                                                                            .palette
                                                                            .mode ===
                                                                        "light"
                                                                            ? "#d4a500" // Subdued color for hover in light mode
                                                                            : "#b38f00", // Subdued color for hover in dark mode
                                                            },
                                                        }}
                                                        onClick={
                                                            handlePropertyCodeClick
                                                        }
                                                    />
                                                </Link>
                                            </Stack>
                                            <Link
                                                href={`/customer/${row?.agreement?.owner?.id}`}
                                                passHref
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    onClick={
                                                        handleCustomerNameClick
                                                    }
                                                    mt={0.5}
                                                >
                                                    Owner{": "}
                                                    {
                                                        row?.agreement?.owner
                                                            ?.name
                                                    }
                                                </Typography>
                                            </Link>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                gap={1}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    mt={0.5}
                                                >
                                                    Expiration Date:{" "}
                                                    {
                                                        row?.agreement
                                                            ?.expirationDate
                                                    }
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    gap={1}
                                                    alignItems="center"
                                                >
                                                    {row?.agreement
                                                        ?.expiresSoon && (
                                                        <>
                                                            <Tooltip
                                                                title="Expires soon"
                                                                placement="top"
                                                            >
                                                                <ExpireIcon
                                                                    color="warning"
                                                                    sx={{
                                                                        width: "21px",
                                                                        height: "21px",
                                                                    }}
                                                                />
                                                            </Tooltip>
                                                        </>
                                                    )}

                                                    {row?.agreement
                                                        ?.expiredToday && (
                                                        <Tooltip
                                                            title="Expired"
                                                            placement="top"
                                                        >
                                                            <ExpiredIcon
                                                                color="error"
                                                                sx={{
                                                                    width: "21px",
                                                                    height: "21px",
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    )}
                                                </Stack>
                                            </Stack>
                                        </Box>
                                    </>
                                ) : null}
                            </Box>
                            {type !== "AGREEMENT" ? (
                                <CustomerInfo
                                    customerEmail={customerEmail}
                                    customerMobile={customerMobile}
                                    tourDate={tourDate}
                                    tourTime={tourTime}
                                    tourType={tourType}
                                />
                            ) : null}
                        </Stack>
                    </Stack>
                </TableCell>
                <TableCell align="right">
                    <Select
                        value={row.viewed ? "Viewed" : "Not Viewed"}
                        onChange={handleStatusChange}
                        displayEmpty
                        onClick={(e) => e.stopPropagation()}
                        sx={{
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
                        <MenuItem value="Viewed">{t("Viewed")}</MenuItem>
                        <MenuItem value="Not Viewed">
                            {t(`Not Viewed`)}
                        </MenuItem>
                    </Select>
                    <Typography variant="body2" color="text.secondary">
                        {getDate(row.notificationDate, i18n.language)}
                    </Typography>
                </TableCell>
            </Link>
        </TableRow>
    );
};

export default BasicRow;
