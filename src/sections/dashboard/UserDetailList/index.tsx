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
import Link from "@/components/Link";
import CustomTypography from "./CustomTypography";

interface TasksCountProps {
    count: number;
    assignee: number;
}

const TasksCount: FC<TasksCountProps> = ({ count, assignee }) => (
    <Link href={`/tasks?assignee=${assignee}`} passHref>
        <Typography
            borderRadius="16px"
            sx={{
                cursor: "pointer",
                width: "90px",
                textWrap: "nowrap",
                textAlign: "center",
                "&:hover": { opacity: 0.8 },
            }}
        >
            {count}
        </Typography>
    </Link>
);

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

interface UserRowProps {
    u: IUserDetails;
    propertiesCount: number;
    activeProperties?: number;
    inactiveProperties?: number;
    customers: number;
}

const UserRow: FC<UserRowProps> = ({
    u,
    propertiesCount,
    activeProperties,
    inactiveProperties,
    customers,
}) => {
    const router = useRouter();
    const handleRedirectProperties = () => {
        router.push({
            pathname: "/property",
            query: { assignee: u.id },
        });
    };

    const handleRedirectActiveProperties = () => {
        router.push({
            pathname: "/property",
            query: { assignee: u.id, active: true },
        });
    };

    const handleRedirectInactiveProperties = () => {
        router.push({
            pathname: "/property",
            query: { assignee: u.id, active: false },
        });
    };
    const handleRedirectCustomers = () => {
        router.push({
            pathname: "/customers",
            query: { managerId: u.id },
        });
    };

    return (
        <Grid container alignItems="center" px={1} sx={UserRowSx}>
            <Grid item xs={3}>
                <User u={u} />
            </Grid>
            <Grid item xs={1}>
                <TasksCount count={u?.activeTasks} assignee={u?.id} />
            </Grid>
            <Grid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectProperties}
                >
                    {propertiesCount}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectActiveProperties}
                >
                    {activeProperties ?? "-"}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectInactiveProperties}
                >
                    {inactiveProperties ?? "-"}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectCustomers}
                >
                    {customers ?? "-"}
                </Typography>
            </Grid>
            <Grid item xs={4}>
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
}

const getUserRow = ({
    properties,
    userDetails,
    activeProperties,
    inactiveProperties,
    customers,
}: UserRow) => (
    <UserRow
        key={userDetails.id}
        u={userDetails}
        propertiesCount={properties}
        activeProperties={activeProperties}
        inactiveProperties={inactiveProperties}
        customers={customers}
    />
);

// -----------------------------------------------------------------------------------

interface HeadProps {
    totalTasks: number;
    totalProperties: number;
}

const Head: FC<HeadProps> = ({ totalTasks, totalProperties }) => {
    const { t } = useTranslation();
    return (
        <Grid container alignItems="center" spacing={1} p={1} py={2}>
            <Grid item xs={3}>
                <CustomTypography
                    label={t("Users")}
                    textAlign="left"
                    variant="h6"
                />
            </Grid>
            <Grid item xs={1}>
                <CustomTypography
                    label={t("Tasks")}
                    count={totalTasks}
                    textAlign="left"
                />
            </Grid>
            <Grid item xs={1}>
                <CustomTypography
                    label={t("Properties")}
                    count={totalProperties}
                />
            </Grid>
            <Grid item xs={1}>
                <CustomTypography label={t("Active")} />
            </Grid>
            <Grid item xs={1}>
                <CustomTypography label={t("Inactive")} />
            </Grid>
            <Grid item xs={1}>
                <CustomTypography label={t("Customers")} />
            </Grid>
            <Grid item xs={4}>
                <CustomTypography label={t("Attribution")} textAlign="left" />
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
                }) => ({
                    properties,
                    activeProperties,
                    inactiveProperties,
                    userDetails,
                    customers,
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
    const totalProperties = data?.totalProperties ?? 0;
    return (
        <Paper variant="outlined">
            <Head totalTasks={totalTasks} totalProperties={totalProperties} />
            {users?.map(getUserRow)}
        </Paper>
    );
};

export default UserDetailList;
