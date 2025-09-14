import Typography from "@mui/material/Typography";
import { FC, PropsWithChildren, useMemo } from "react";
import ResponsiveGrid from "../../ResponsiveGrid";
import TasksCount from "./TasksCount";
import { PropertiesPerUserList } from "@/types/dashboard";
import Link from "@/components/Link";
import { useTranslation } from "react-i18next";
import getDATA, { DataProps, Datum } from "../../getDATA";
import { SxProps, Theme } from "@mui/material";
import isFalsy from "@/utils/isFalsy";

// ----------------------------------------------------------------------------------------

const getItemSx = (popover: boolean): SxProps<Theme> => ({
    ...(popover
        ? {
              display: "flex",
              flexDirection: "row",
              gap: 1,
          }
        : {}),
});

interface ItemProps extends PropsWithChildren {
    d: Datum;
    popover: boolean;
}

const Item: FC<ItemProps> = ({ d, popover, children }) => {
    const { label, count, xs, textAlign, href = "" } = d ?? {};
    return (
        <ResponsiveGrid
            component={Link}
            xs={xs}
            textAlign={textAlign}
            {...({ href } as any)}
            sx={getItemSx(popover)}
        >
            {popover ? <Typography variant="h6">{label}:</Typography> : null}

            {isFalsy(count) ? children : null}

            {isFalsy(children) ? (
                <Typography
                    textAlign="center"
                    sx={{ "&:hover": { opacity: 0.8, cursor: "pointer" } }}
                >
                    {count}
                </Typography>
            ) : null}
        </ResponsiveGrid>
    );
};

// ----------------------------------------------------------------------------------------

const getItemForDatum = (popover: boolean) => (d: Datum) => (
    <Item key={d.label} d={d} popover={popover} />
);

// ----------------------------------------------------------------------------------------

interface CountsProps extends PropertiesPerUserList {
    popover?: boolean;
}

const Counts: FC<CountsProps> = ({
    userDetails,
    properties,
    activeProperties,
    inactiveProperties,
    customers,
    notifications,
    // ...
    popover = false,
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
    const DATA = useMemo(
        () => getDATA(t, p, userDetails.id).slice(1),
        [t, p, userDetails.id]
    );

    return (
        <>
            <Item popover={popover} d={{ label: t("Tasks"), xs: 1 }}>
                <TasksCount
                    count={userDetails.activeTasks}
                    assignee={userDetails.id}
                />
            </Item>

            {DATA.map(getItemForDatum(popover))}
        </>
    );
};

export type { CountsProps };
export default Counts;
