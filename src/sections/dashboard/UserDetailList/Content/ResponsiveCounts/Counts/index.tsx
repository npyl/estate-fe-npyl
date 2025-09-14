import Typography from "@mui/material/Typography";
import { FC } from "react";
import ResponsiveGrid from "../../ResponsiveGrid";
import TasksCount from "./TasksCount";
import { PropertiesPerUserList } from "@/types/dashboard";
import { GridProps } from "@mui/material";
import Link from "@/components/Link";

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

interface CountsProps extends PropertiesPerUserList {}

const Counts: FC<CountsProps> = ({
    userDetails,
    properties,
    activeProperties,
    inactiveProperties,
    customers,
    notifications,
}) => (
    <>
        <ResponsiveGrid item xs={1}>
            <TasksCount
                count={userDetails.activeTasks}
                assignee={userDetails.id}
            />
        </ResponsiveGrid>
        <Item xs={1} href={`/property?assignee=${userDetails.id}`}>
            {properties ?? "-"}
        </Item>
        <Item xs={1} href={`/property?assignee=${userDetails.id}&active=true`}>
            {activeProperties ?? "-"}
        </Item>
        <Item xs={1} href={`/property?assignee=${userDetails.id}&active=false`}>
            {inactiveProperties ?? "-"}
        </Item>
        <Item xs={1} href={`/customer?managerId=${userDetails.id}`}>
            {customers ?? "-"}
        </Item>
        <Item xs={1.2} href={`/notification?user=${userDetails.id}`}>
            {notifications ?? "-"}
        </Item>
    </>
);

export type { CountsProps };
export default Counts;
