import { useMemo } from "react";
import { PropertiesPerUserList } from "@/types/dashboard";

interface Reduced {
    totalTasks: number;
    totalCustomers: number;
    totalNotifications: number;
}

const INITIAL: Reduced = {
    totalTasks: 0,
    totalCustomers: 0,
    totalNotifications: 0,
};

const reducer = (sum: Reduced, user: PropertiesPerUserList) => ({
    totalTasks: sum.totalTasks + (user.userDetails.activeTasks ?? 0),
    totalCustomers: sum.totalCustomers + (user.customers || 0),
    totalNotifications: sum.totalNotifications + (user.notifications || 0),
});

const useReduced = (list: PropertiesPerUserList[]) =>
    useMemo(() => list?.reduce<Reduced>(reducer, INITIAL) ?? INITIAL, [list]);

export default useReduced;
