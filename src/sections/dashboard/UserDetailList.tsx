import Avatar from "@/components/Avatar";
import { useGetDashboardQuery } from "@/services/dashboard";
import { IUserDetails } from "@/types/dashboard";
import { alpha, Box, SxProps, Theme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

interface TasksCountProps {
    count: number;
    assignee: number;
}

const TasksCount: FC<TasksCountProps> = ({ count, assignee }) => {
    const { t } = useTranslation();
    const router = useRouter();

    const handleRedirectTasks = () => {
        router.push({
            pathname: "/tasks",
            query: { assignee },
        });
    };

    return (
        <Typography
            color="info.main"
            bgcolor={(theme) => alpha(theme.palette.info.main, 0.3)}
            borderRadius="16px"
            px={1}
            sx={{ cursor: "pointer", "&:hover": { opacity: 0.8 } }}
            onClick={handleRedirectTasks}
        >
            {count} {t("_tasks_lowercase")}
        </Typography>
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
            width="25%"
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
}

const UserRow: FC<UserRowProps> = ({ u, propertiesCount }) => (
    <Stack
        width={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={1}
        sx={UserRowSx}
    >
        <User u={u} />

        <TasksCount count={u?.activeTasks} assignee={u?.id} />

        <PropertiesProgress count={propertiesCount} assignee={u?.id} />
    </Stack>
);

// -----------------------------------------------------------------------------------

interface UserRow {
    properties: number;
    userDetails: IUserDetails;
}

const getUserRow = ({ properties, userDetails }: UserRow) => (
    <UserRow
        key={userDetails.id}
        u={userDetails}
        propertiesCount={properties}
    />
);

// -----------------------------------------------------------------------------------

const Head = () => {
    const { t } = useTranslation();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            p={1}
            py={2}
        >
            <Typography width="20%">{t("Users")}</Typography>
            <Typography>{t("Active Tasks")}</Typography>
            <Typography width="25%">{t("Total Properties")}</Typography>
        </Stack>
    );
};

const UserDetailList = () => {
    const { data } = useGetDashboardQuery();

    const users = useMemo(
        () =>
            data?.propertiesPerUserList?.map(({ userDetails, properties }) => ({
                properties,
                userDetails,
            })),
        [data?.propertiesPerUserList]
    );

    return (
        <Paper variant="outlined">
            <Head />
            {users?.map(getUserRow)}
        </Paper>
    );
};

export default UserDetailList;
