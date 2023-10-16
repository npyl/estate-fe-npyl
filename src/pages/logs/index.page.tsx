import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns"; // for date formatting
import { useAdminLogsPaginatedQuery } from "src/services/logs";
import Link from "next/link";
import {
    Box,
    CircularProgress,
    Paper,
    Typography,
    Pagination,
    Skeleton,
    Stack,
    Grid,
} from "@mui/material";
import { ILog } from "src/types/logs"; // import your log type
import { NextPage } from "next";
import { AuthGuard } from "src/components/authentication/auth-guard";
import { DashboardLayout } from "src/components/dashboard/dashboard-layout";
import { alpha } from "@mui/material/styles";
import { Avatar, useTheme, Divider } from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { deepOrange, green, deepPurple } from "@mui/material/colors";

interface LogCardProps {
    log: ILog;
}

const LogCard: FC<LogCardProps> = ({ log }) => {
    const theme = useTheme();
    const formattedDate = format(new Date(log.createdAt), "dd-MM-yyyy hh:mm");

    // Determine the resource description based on the type
    let resourceDescription: JSX.Element;
    if (log.resourceType.key === "PROPERTY") {
        resourceDescription = (
            <span>
                with property code{" "}
                <Link href={`/property/${log.propertyId}`} passHref>
                    {log.propertyCode}
                </Link>
            </span>
        );
    } else if (log.resourceType.key === "CUSTOMER" && log.customer) {
        // Assuming log.customer has an 'id' field for the route
        resourceDescription = (
            <span>
                with name{" "}
                <Link href={`/customer/${log.customerId}`} passHref>
                    {log.customer} {/* Adjust if the field is different */}
                </Link>
            </span>
        );
    } else if (log.resourceType.key === "IMAGE") {
        resourceDescription = (
            <span>
                to the property with code{" "}
                <Link href={`/property/${log.propertyCode}`} passHref>
                    {log.propertyCode}
                </Link>
            </span>
        );
    } else {
        resourceDescription = <span></span>;
    }

    // Generate avatar colors based on action type
    const getAvatarColor = () => {
        switch (log.action.value.toLowerCase()) {
            case "created":
                return green[500];
            case "updated":
                return deepOrange[500];
            case "deleted":
                return theme.palette.error.main;
            default:
                return deepPurple[500];
        }
    };

    return (
        <Paper
            elevation={3}
            style={{ padding: theme.spacing(2), marginTop: theme.spacing(1) }}
        >
            <Grid container spacing={2}>
                {/* Left: User info and Action */}
                <Grid item style={{ flexShrink: 0 }}>
                    <Avatar
                        style={{
                            backgroundColor: getAvatarColor(),
                            marginRight: theme.spacing(1.5),
                        }}
                    >
                        {log.user.firstName.charAt(0)}
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle1">
                        <strong>
                            {log.user.firstName} {log.user.lastName}
                        </strong>{" "}
                        {log.action.value.toLowerCase()} a{" "}
                        {log.resourceType.value.toLowerCase()}{" "}
                        {resourceDescription}
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
            </Grid>
            <Divider
                style={{
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1),
                }}
            />
            {/* Optional: Additional content can go here (e.g., if you want to expand on details or add interactive elements) */}
        </Paper>
    );
};

const Logs: NextPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const { data, error, isLoading } = useAdminLogsPaginatedQuery({
        page: page, // Since Material-UI's Pagination component uses 1-based numbering
        pageSize: pageSize,
    });

    if (isLoading) return <CircularProgress />; // Show a loading indicator
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value - 1); // Adjust page number for zero-based numbering API
    };

    // Placeholder skeletons when data is loading
    const loadingSkeletons = [...Array(pageSize)].map((_, index) => (
        <Skeleton
            key={index}
            variant="rectangular"
            height={118}
            style={{ marginBottom: "10px" }}
        />
    ));

    // Main content to render
    const content = isLoading
        ? loadingSkeletons
        : data?.content.map((log) => <LogCard key={log.createdAt} log={log} />);

    return (
        <Box marginTop={"20px"}>
            <Stack spacing={2}>{content}</Stack>
            {data &&
                !isLoading && ( // Only display pagination when data is loaded
                    <Box
                        display="flex" // Establishes a flex container
                        justifyContent="center" // Centers items on the main axis
                        alignItems="center" // Centers items on the cross axis
                        my={3} // Adds spacing around the Box, change as needed
                    >
                        <Pagination
                            count={data.totalPages}
                            page={page + 1} // Adjust for 1-based numbering of Material-UI Pagination
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}
        </Box>
    );
};
Logs.getLayout = (page) => (
    <AuthGuard>
        <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
);

export default Logs;
