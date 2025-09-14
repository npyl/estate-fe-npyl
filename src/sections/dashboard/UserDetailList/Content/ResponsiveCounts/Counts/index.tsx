import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import ResponsiveGrid from "../../ResponsiveGrid";
import TasksCount from "./TasksCount";
import { PropertiesPerUserList } from "@/types/dashboard";
import { GridProps } from "@mui/material";
import Link from "@/components/Link";
import { useTranslation } from "react-i18next";
import getDATA, { DataProps, Datum } from "../../getDATA";

// ----------------------------------------------------------------------------------------

interface ItemProps extends Omit<GridProps, "component"> {
    href: string;
}

const Item: FC<ItemProps> = ({ children, ...props }) => (
    <ResponsiveGrid item component={Link} {...props}>
        <Typography
            textAlign="center"
            sx={{ "&:hover": { opacity: 0.8, cursor: "pointer" } }}
        >
            {children}
        </Typography>
    </ResponsiveGrid>
);

// ----------------------------------------------------------------------------------------

const getItemForDatum = ({ label, count, xs, textAlign, href = "" }: Datum) => (
    <Item key={label} href={href} xs={xs} textAlign={textAlign}>
        {count}
    </Item>
);

interface CountsProps extends PropertiesPerUserList {}

const Counts: FC<CountsProps> = ({
    userDetails,
    properties,
    activeProperties,
    inactiveProperties,
    customers,
    notifications,
}) => {
    const { t } = useTranslation();
    const p: DataProps = {
        totalActiveProperties: activeProperties,
        totalInactiveProperties: inactiveProperties,
        totalCustomers: customers,
        totalNotifications: notifications,
        totalProperties: properties,
        totalTasks: userDetails.activeTasks,
    };

    // INFO: start from index=1 because we render a custom view here.
    const DATA = useMemo(() => getDATA(t, p).slice(1), [t]);

    return (
        <>
            <ResponsiveGrid item xs={1}>
                <TasksCount
                    count={userDetails.activeTasks}
                    assignee={userDetails.id}
                />
            </ResponsiveGrid>

            {DATA.map(getItemForDatum)}
        </>
    );
};

export type { CountsProps };
export default Counts;
