import { TranslationType } from "@/types/translation";

interface DataProps {
    totalTasks: number;
    totalProperties: number;
    totalActiveProperties: number;
    totalInactiveProperties: number;
    totalCustomers: number;
    totalNotifications: number;
}

interface Datum {
    label: string;
    textAlign?: any;
    xs: number;
    count: number;
    href?: string;
}

const getDATA = (
    t: TranslationType,
    p: DataProps,
    userId?: number
): Datum[] => [
    { label: t("Tasks"), xs: 1, count: p.totalTasks, textAlign: "left" },
    // ...
    {
        label: t("Properties"),
        xs: 1,
        count: p.totalProperties,
        href: `/property?assignee=${userId}`,
    },
    {
        label: t("Active"),
        xs: 1,
        count: p.totalActiveProperties,
        href: `/property?assignee=${userId}&active=true`,
    },
    {
        label: t("Inactive"),
        xs: 1,
        count: p.totalInactiveProperties,
        href: `/property?assignee=${userId}&active=false`,
    },
    {
        label: t("Customers"),
        xs: 1,
        count: p.totalCustomers,
        href: `/customer?managerId=${userId}`,
    },
    {
        label: t("Notifications"),
        xs: 1,
        count: p.totalNotifications,
        href: `/notification?user=${userId}`,
    },
];

export type { Datum, DataProps };
export default getDATA;
