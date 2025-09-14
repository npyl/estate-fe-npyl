import { useGetDashboardQuery } from "@/services/dashboard";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
import getUserRow from "./getUserRow";
import Head from "./Head";

// -----------------------------------------------------------------------------------

const UserDetailList = () => {
    const { data } = useGetDashboardQuery();

    const users = data?.propertiesPerUserList ?? [];

    const totalActiveProperties = data?.totalActiveProperties ?? 0;
    const totalProperties = data?.totalProperties ?? 0;
    const totalInactiveProperties = data?.totalInactiveProperties ?? 0;

    const all = useMemo(
        () =>
            data?.propertiesPerUserList?.reduce(
                (sum, user) => ({
                    activeTasks:
                        sum.activeTasks + (user.userDetails.activeTasks ?? 0),
                    customers: sum.customers + (user.customers || 0),
                    notifications:
                        sum.notifications + (user.notifications || 0),
                }),
                { activeTasks: 0, customers: 0, notifications: 0 }
            ),
        [data?.propertiesPerUserList]
    );

    return (
        <Paper variant="outlined">
            <Head
                totalTasks={all?.activeTasks ?? 0}
                totalCustomers={all?.customers ?? 0}
                totalNotifications={all?.notifications ?? 0}
                // ...
                totalProperties={totalProperties}
                totalActiveProperties={totalActiveProperties}
                totalInactiveProperties={totalInactiveProperties}
            />
            {users?.map(getUserRow)}
        </Paper>
    );
};

export default UserDetailList;
