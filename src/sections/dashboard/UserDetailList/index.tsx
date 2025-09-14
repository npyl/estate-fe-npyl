import { useGetDashboardQuery } from "@/services/dashboard";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import getUserRow from "./getUserRow";
import Head from "./Head";

// -----------------------------------------------------------------------------------

const UserDetailList = () => {
    const { data } = useGetDashboardQuery();

    const users = data?.propertiesPerUserList ?? [];

    const totalTasks = useMemo(() => {
        return (
            data?.propertiesPerUserList?.reduce(
                (sum, user) => sum + (user.userDetails.activeTasks || 0),
                0
            ) ?? 0
        );
    }, [data?.propertiesPerUserList]);

    const totalActiveProperties = data?.totalActiveProperties ?? 0;
    const totalProperties = data?.totalProperties ?? 0;
    const totalInactiveProperties = data?.totalInactiveProperties ?? 0;

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
