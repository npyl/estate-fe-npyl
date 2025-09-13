import Avatar from "@/components/Avatar";
import { useGetDashboardQuery } from "@/services/dashboard";
import { IUserDetails } from "@/types/dashboard";
import { Box, Grid, SxProps, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import CustomTypography from "./Counts/CustomTypography";
import CountsPopover from "./CountsPopover";
import { UserRowProps } from "./types";
import Counts from "./Counts";
import ResponsiveGrid from "./ResponsiveGrid";

interface PropertiesProgressProps {
    count: number;
    assignee: number;
}

const PropertiesProgress: FC<PropertiesProgressProps> = ({
    count,
    assignee,
}) => {
    const { data } = useGetDashboardQuery();

    const all = data?.totalProperties ?? 1000;

    const percentage = Math.round((count / all) * 100);
    const router = useRouter();

    const handleRedirectProperties = () => {
        router.push({
            pathname: "/property",
            query: { assignee },
        });
    };
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
        >
            <Box
                width="100%"
                height="8px"
                bgcolor="divider"
                position="relative"
                borderRadius="4px"
                onClick={handleRedirectProperties}
            >
                <Box
                    width={`${percentage}%`}
                    height="100%"
                    bgcolor="warning.main"
                    position="absolute"
                    zIndex={100}
                    top={0}
                    left={0}
                    borderRadius="4px"
                />
            </Box>
            <Typography>{percentage}%</Typography>
        </Stack>
    );
};

interface UserProps {
    u: IUserDetails;
}

const User: FC<UserProps> = ({ u }) => {
    const fullname = `${u?.firstName || ""} ${u?.lastName || ""}`;

    return (
        <Stack direction="row" spacing={1} alignItems="center" width="20%">
            <Avatar
                src={u?.avatar}
                firstName={u?.firstName}
                lastName={u?.lastName}
                sx={{ width: 34, height: 34 }}
            />

            <Stack>
                <Typography
                    fontWeight="bold"
                    variant="body2"
                    sx={{ textWrap: "nowrap" }}
                >
                    {fullname}
                </Typography>
            </Stack>
        </Stack>
    );
};

// -----------------------------------------------------------------------------------

const UserRowSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: "divider",
    "&:nth-of-type(even)": {
        bgcolor: ({ palette: { mode, neutral } }) =>
            mode === "light" ? neutral?.[200] : neutral?.[800],
    },
    ":not(last-of-type)": {
        borderBottom: 0,
    },
    borderLeft: 0,
    borderRight: 0,
    py: 0.5,
};

const UserRow: FC<UserRowProps> = (props) => {
    const { u, propertiesCount } = props;

    return (
        <Grid container alignItems="center" px={1} sx={UserRowSx}>
            <Grid item xs={4} md={3}>
                <User u={u} />
            </Grid>

            {/* ----- */}
            <Counts {...props} />

            <CountsPopover>
                <Counts {...props} />
            </CountsPopover>

            {/* ----- */}

            <Grid item xs={4} md={2.8}>
                <PropertiesProgress count={propertiesCount} assignee={u?.id} />
            </Grid>
        </Grid>
    );
};

// -----------------------------------------------------------------------------------

interface UserRow {
    properties: number;
    userDetails: IUserDetails;
    activeProperties: number;
    inactiveProperties: number;
    customers: number;
    notifications: number;
}

const getUserRow = ({
    properties,
    userDetails,
    activeProperties,
    inactiveProperties,
    customers,
    notifications,
}: UserRow) => (
    <UserRow
        key={userDetails.id}
        u={userDetails}
        propertiesCount={properties}
        activeProperties={activeProperties}
        inactiveProperties={inactiveProperties}
        customers={customers}
        notifications={notifications}
    />
);

// -----------------------------------------------------------------------------------

const CountsPopoverHead = () => {
    const { t } = useTranslation();
    return (
        <CustomTypography
            width={1 / 3}
            label={t("Statistics")}
            display={{ xs: "block", md: "none" }}
        />
    );
};

interface HeadProps {
    totalTasks: number;
    totalProperties: number;
    totalActiveProperties: number;
    totalInactiveProperties: number;
    totalCustomers: number;
    totalNotifications: number;
}

const Head: FC<HeadProps> = ({
    totalTasks,
    totalProperties,
    totalActiveProperties,
    totalInactiveProperties,
    totalCustomers,
    totalNotifications,
}) => {
    const { t } = useTranslation();
    return (
        <Grid container alignItems="center" spacing={1} p={1} py={2}>
            <Grid item xs={4} md={3}>
                <CustomTypography
                    label={t("Users")}
                    textAlign="left"
                    variant="h6"
                />
            </Grid>

            {/* ----- */}
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Tasks")}
                    count={totalTasks}
                    textAlign="left"
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Properties")}
                    count={totalProperties}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Active")}
                    count={totalActiveProperties}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Inactive")}
                    count={totalInactiveProperties}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <CustomTypography
                    label={t("Customers")}
                    count={totalCustomers}
                />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1.2}>
                <CustomTypography
                    label={t("Notifications")}
                    count={totalNotifications}
                />
            </ResponsiveGrid>
            {/* ----- */}

            <CountsPopoverHead />

            <Grid item xs={4} md={2.8}>
                <CustomTypography label={t("Attribution")} textAlign="right" />
            </Grid>
        </Grid>
    );
};

const UserDetailList = () => {
    const { data } = useGetDashboardQuery();

    const users = useMemo(
        () =>
            data?.propertiesPerUserList?.map(
                ({
                    userDetails,
                    properties,
                    activeProperties,
                    inactiveProperties,
                    customers,
                    notifications = 100,
                }) => ({
                    properties,
                    activeProperties,
                    inactiveProperties,
                    userDetails,
                    customers,
                    notifications,
                })
            ),
        [data?.propertiesPerUserList]
    );

    const totalTasks = useMemo(() => {
        return (
            data?.propertiesPerUserList?.reduce(
                (sum, user) => sum + (user.userDetails.activeTasks || 0),
                0
            ) ?? 0
        );
    }, [data?.propertiesPerUserList]);

    const totalActiveProperties = useMemo(() => {
        return data?.totalActiveProperties ?? 0;
    }, [data?.totalActiveProperties]);

    const totalProperties = data?.totalProperties ?? 0;

    const totalInactiveProperties = useMemo(() => {
        return data?.totalInactiveProperties ?? 0;
    }, [data?.totalInactiveProperties]);

    const totalCustomers = useMemo(() => {
        return (
            data?.propertiesPerUserList?.reduce(
                (sum, user) => sum + (user.customers || 0),
                0
            ) ?? 0
        );
    }, [data?.propertiesPerUserList]);

    const totalNotifications = useMemo(() => {
        return (
            data?.propertiesPerUserList?.reduce(
                (sum, user) => sum + (user.notifications || 0),
                0
            ) ?? 0
        );
    }, [data?.propertiesPerUserList]);
    return (
        <Paper variant="outlined">
            <Head
                totalTasks={totalTasks}
                totalProperties={totalProperties}
                totalActiveProperties={totalActiveProperties}
                totalInactiveProperties={totalInactiveProperties}
                totalCustomers={totalCustomers}
                totalNotifications={totalNotifications}
            />
            {users?.map(getUserRow)}
        </Paper>
    );
};

export default UserDetailList;
