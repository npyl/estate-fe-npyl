import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Avatar,
    Box,
    Chip,
    Container,
    Divider,
    Grid,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { green, purple, yellow } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import useTheme from "@mui/system/useTheme";
import { format } from "date-fns"; // for date formatting
import { NextPage } from "next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import useResponsive from "src/hooks/useResponsive";
import { useFilterLogsMutation } from "src/services/logs";
import { selectAll } from "src/slices/log";
import { ILog } from "src/types/logs"; // import your log type
import { FilterLogSection } from "./components";
import FilterMore from "@/components/Filters/FilterMore/Dialog";
import FloatingButton from "@/components/Filters/FilterMore/FloatingButton";

export interface LogCardProps {
    log: ILog;
}

export const LogCard: FC<LogCardProps> = ({ log }) => {
    const theme = useTheme();
    const formattedDate = format(new Date(log.createdAt), "dd-MM-yyyy hh:mm");

    const getCardBackgroundColor = () => {
        switch (log?.action?.key) {
            case "CREATE":
                return alpha(green[500], 0.1); // even lighter green
            case "EDIT":
                return alpha(yellow[700], 0.1); // even lighter yellow
            case "ADD":
                return alpha(yellow[700], 0.1); // even lighter yellow
            case "DELETE":
                return alpha(theme.palette.error.main, 0.1); // even lighter red
            case "RESTORE":
                return alpha("#EFCFEC", 0.2); // make it lighter
            case "DOWNLOAD":
                return alpha("#CBEBF2", 0.2); // make it lighter
            default:
                return ""; // default, no background color or whatever you prefer
        }
    };
    const getLabelColor = () => {
        switch (log?.action?.key) {
            case "CREATE":
                return green[400]; // Lighter shade of green
            case "EDIT":
                return yellow[600]; // Lighter shade of yellow
            case "ADD":
                return yellow[600]; // Lighter shade of yellow
            case "DELETE":
                return theme.palette.error.light; // Lighter shade of red
            case "RESTORE":
                return purple[600]; // Lighter shade of purple
            case "DOWNLOAD":
                return alpha("#33C6E4", 0.6); // A lighter approximation of "#00BCE1"

            default:
                return theme.palette.text.primary; // default color
        }
    };
    const actionLabel = (
        <Chip
            label={log?.action?.value} // assuming it's the human-readable action value
            style={{
                backgroundColor: getLabelColor(), // color based on action
                color: "#FFFFFF", // set text color to white
                position: "relative", // absolutely position this element
                top: theme.spacing(1), // spacing from the top
                right: theme.spacing(1), // spacing from the right
            }}
        />
    );

    return (
        <Paper
            elevation={3}
            style={{
                position: "relative",
                padding: theme.spacing(2),
                marginTop: theme.spacing(1),
                backgroundColor: getCardBackgroundColor(), // set background color here
            }}
        >
            <Grid container spacing={2}>
                {/* Left: User info and Action */}
                <Grid item style={{ flexShrink: 0 }}>
                    <Avatar
                        style={{
                            marginRight: theme.spacing(1.5),
                        }}
                    >
                        {log?.user?.firstName.charAt(0)}
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle1">
                        <>
                            <strong>
                                {log?.user?.firstName} {log?.user?.lastName}{" "}
                            </strong>
                            {log?.message}{" "}
                            <Link
                                href={
                                    log?.customerId
                                        ? `/customer/${log?.customerId}`
                                        : `/property/${log?.propertyCode}`
                                }
                                passHref
                            >
                                {" "}
                                {log?.customerId
                                    ? log?.customerId
                                    : log?.propertyCode}
                            </Link>
                        </>
                    </Typography>
                    <Typography
                        variant="caption"
                        display="block"
                        gutterBottom
                        style={{ color: theme.palette.text.secondary }}
                    >
                        <AccessTimeIcon
                            fontSize="inherit"
                            style={{
                                verticalAlign: "middle",
                                marginRight: theme.spacing(0.5),
                            }}
                        />
                        {formattedDate}
                    </Typography>
                </Grid>
                <Grid item xs={3} textAlign={"end"}>
                    {actionLabel}
                </Grid>
            </Grid>
            <Divider
                style={{
                    borderTop: "0px solid",
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1),
                    borderColor: "rgba(0, 0, 0, 0.3)",
                }}
            />

            {/* Optional: Additional content can go here (e.g., if you want to expand on details or add interactive elements) */}
        </Paper>
    );
};

const Logs: NextPage = () => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const allFilters = useSelector(selectAll);
    const [filterLogs, { data }] = useFilterLogsMutation();
    const isMobile = useResponsive("down", 500);
    useEffect(() => {
        revalidate();
    }, [allFilters, page, pageSize]);

    const revalidate = () => {
        filterLogs({
            filter: allFilters,
            page: page,
            pageSize: pageSize,
            language: i18n.language,
        });
    };
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value - 1); // Adjust page number for zero-based numbering API
    };

    // Main content to render
    const content = data?.content.map((log, index) => (
        <LogCard key={index} log={log} />
    ));

    return (
        <>
            {isMobile ? (
                <FloatingButton
                    badgeContent={checkFields(allFilters) ? 1 : 0}
                    onClick={() => setOpen(true)}
                />
            ) : (
                <Stack spacing={1} component={Paper} p={1}>
                    <FilterLogSection />
                </Stack>
            )}

            <Stack spacing={2}>{content}</Stack>

            {data && data.totalPages > 0 ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Pagination
                        count={data.totalPages}
                        page={page + 1}
                        onChange={handlePageChange}
                        color="primary"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            ) : (
                <Container maxWidth="sm">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="500px" // Adjust the height as needed
                    >
                        <Typography variant="subtitle1" color="textSecondary">
                            No results
                        </Typography>
                    </Box>
                </Container>
            )}

            {open ? (
                <FilterMore
                    open={open}
                    onClose={() => setOpen(false)}
                    changedFiltersCount={checkFields(allFilters) ? 1 : 0}
                    onResetFilter={() => {}}
                >
                    <FilterLogSection />
                </FilterMore>
            ) : null}
        </>
    );
};

Logs.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Logs;

function checkFields(obj: any) {
    // List of fields to check in the object
    const fieldsToCheck = [
        "resources",
        "actions",
        "users",
        "fromDate",
        "toDate",
    ];

    // Iterate over the list of fields
    for (let field of fieldsToCheck) {
        const value = obj[field];

        // Check if the field exists
        if (value !== undefined) {
            // Check if it's an array with length > 0 or a non-array value
            if (Array.isArray(value) ? value.length > 0 : true) {
                return true; // Return true if the field meets the criteria
            }
        }
    }

    // Return false if none of the fields meet the criteria
    return false;
}
