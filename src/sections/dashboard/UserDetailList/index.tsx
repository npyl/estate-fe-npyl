import { useGetDashboardQuery } from "@/services/dashboard";
import Paper from "@mui/material/Paper";
import getUserRow from "./getUserRow";
import Head from "./Head";
import useReduced from "./useReduced";

const UserDetailList = () => {
    const { data } = useGetDashboardQuery();

    const users = data?.propertiesPerUserList ?? [];

    const totalActiveProperties = data?.totalActiveProperties ?? 0;
    const totalProperties = data?.totalProperties ?? 0;
    const totalInactiveProperties = data?.totalInactiveProperties ?? 0;

    const { activeTasks, customers, notifications } = useReduced(users);

    return (
        <Paper variant="outlined">
            <Head
                totalTasks={activeTasks}
                totalCustomers={customers}
                totalNotifications={notifications}
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
