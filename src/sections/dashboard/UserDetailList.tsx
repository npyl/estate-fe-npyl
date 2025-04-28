import Avatar from "@/components/Avatar";
import { useGetDashboardQuery } from "@/services/dashboard";
import { IUserDetails } from "@/types/dashboard";
import { alpha, Box, Grid, SxProps, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Link from "@/components/Link";

interface TasksCountProps {
    count: number;
    assignee: number;
}

const TasksCount: FC<TasksCountProps> = ({ count, assignee }) => {
    const { t } = useTranslation();
    return (
        <Link href={`/tasks?assignee=${assignee}`} passHref>
            <Typography
                color="info.main"
                bgcolor={(theme) => alpha(theme.palette.info.main, 0.3)}
                borderRadius="16px"
                px={1}
                sx={{
                    cursor: "pointer",
                    width: "110px",
                    textWrap: "nowrap",
                    textAlign: "center",
                    "&:hover": { opacity: 0.8 },
                }}
            >
                {count} {t("_tasks_lowercase")}
            </Typography>
        </Link>
    );
};

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
            />

            <Stack>
                <Typography fontWeight="bold" variant="body2">
                    {fullname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {u?.email}
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
}) => (
    <Grid container alignItems="center" px={1} sx={UserRowSx}>
        <Grid item xs={2.7}>
            <User u={u} />
        </Grid>
        <Grid item xs={1.3}>
            <TasksCount count={u?.activeTasks} assignee={u?.id} />
        </Grid>
        <Grid item xs={1}>
            <Typography textAlign="center">{propertiesCount}</Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography textAlign="center">
                {activeProperties ?? "-"}
            </Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography textAlign="center">
                {inactiveProperties ?? "-"}
            </Typography>
        </Grid>
        <Grid item xs={1}>
            <Typography textAlign="center">{customers ?? "-"}</Typography>
        </Grid>
        <Grid item xs={4}>
            <PropertiesProgress count={propertiesCount} assignee={u?.id} />
        </Grid>
    </Grid>
);

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
            <Grid item xs={2.7}>
                <Typography variant="subtitle2" fontWeight={"bold"}>
                    {t("Users")}
                </Typography>{" "}
            </Grid>
            <Grid item xs={1.3}>
                <Typography
                    variant="subtitle2"
                    textAlign="left"
                    fontWeight={600}
                >
                    {t("Tasks")} ({totalTasks})
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    variant="subtitle2"
                    textAlign="center"
                    fontWeight={600}
                    sx={{ textWrap: "nowrap" }}
                >
                    {t("Properties")} ({totalProperties})
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    variant="subtitle2"
                    textAlign="center"
                    fontWeight={600}
                >
                    {t("Active")}{" "}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    variant="subtitle2"
                    textAlign="center"
                    fontWeight={600}
                >
                    {t("Inactive")}
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography
                    variant="subtitle2"
                    textAlign="center"
                    fontWeight={600}
                >
                    {t("Customers")}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography
                    variant="subtitle2"
                    textAlign="left"
                    fontWeight={600}
                >
                    {t("Attribution")}
                </Typography>
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
