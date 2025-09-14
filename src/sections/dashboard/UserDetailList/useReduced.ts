import { useMemo } from "react";
import { PropertiesPerUserList } from "@/types/dashboard";

interface Reduced {
    activeTasks: number;
    customers: number;
    notifications: number;
}

const INITIAL: Reduced = { activeTasks: 0, customers: 0, notifications: 0 };

const reducer = (sum: Reduced, user: PropertiesPerUserList) => ({
    activeTasks: sum.activeTasks + (user.userDetails.activeTasks ?? 0),
    customers: sum.customers + (user.customers || 0),
    notifications: sum.notifications + (user.notifications || 0),
});

const useReduced = (list: PropertiesPerUserList[]) =>
    useMemo(() => list?.reduce<Reduced>(reducer, INITIAL) ?? INITIAL, [list]);

export default useReduced;
