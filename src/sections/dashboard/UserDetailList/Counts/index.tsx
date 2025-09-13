import Typography from "@mui/material/Typography";
import { FC } from "react";
import { useRouter } from "next/router";
import { UserRowProps } from "../types";

interface CountsProps extends UserRowProps {}

const Counts: FC<CountsProps> = ({
    u,
    propertiesCount,
    activeProperties,
    inactiveProperties,
    customers,
    notifications,
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
            pathname: "/customer",
            query: { managerId: u.id },
        });
    };

    const handleRedirectNotifications = () => {
        router.push({
            pathname: "/notification",
            query: { user: u.id },
        });
    };

    return (
        <>
            <ResponsiveGrid item xs={1}>
                <TasksCount count={u?.activeTasks} assignee={u?.id} />
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectProperties}
                >
                    {propertiesCount}
                </Typography>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectActiveProperties}
                >
                    {activeProperties ?? "-"}
                </Typography>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectInactiveProperties}
                >
                    {inactiveProperties ?? "-"}
                </Typography>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectCustomers}
                >
                    {customers ?? "-"}
                </Typography>
            </ResponsiveGrid>
            <ResponsiveGrid item xs={1.2}>
                <Typography
                    textAlign="center"
                    sx={{
                        "&:hover": { opacity: 0.8, cursor: "pointer" },
                    }}
                    onClick={handleRedirectNotifications}
                >
                    {notifications ?? "-"}
                </Typography>
            </ResponsiveGrid>
        </>
    );
};

export default Counts;
