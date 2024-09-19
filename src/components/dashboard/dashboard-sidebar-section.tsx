import type { ListProps } from "@mui/material";
import { List, ListSubheader } from "@mui/material";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import DashboardSidebarItem from "./dashboard-sidebar-item";
import { TranslationType } from "@/types/translation";

interface Item {
    path?: string;
    icon?: ReactNode;
    chip?: ReactNode;
    info?: ReactNode;
    children?: Item[];
    title: string;
}

interface DashboardSidebarSectionProps extends ListProps {
    items: Item[];
    path: string;
    title: string;
}

const renderNavItems = ({
    depth = 0,
    items,
    path,
    t,
}: {
    depth?: number;
    items: Item[];
    path: string;
    t: TranslationType;
}): JSX.Element => (
    <List disablePadding>
        {items.reduce(
            (acc: JSX.Element[], item) =>
                reduceChildRoutes({ acc, depth, item, path, t }),
            []
        )}
    </List>
);

const reduceChildRoutes = ({
    acc,
    depth,
    item,
    path,
    t,
}: {
    acc: JSX.Element[];
    depth: number;
    item: Item;
    path: string;
    t: TranslationType;
}): Array<JSX.Element> => {
    const key = `${item.title}-${depth}`;

    const partialMatch =
        item.title === t("Dashboard") && path === "/"
            ? true
            : item.path && item.path !== "/"
            ? path.includes(item.path)
            : false;

    if (item.children) {
        acc.push(
            <DashboardSidebarItem
                active={partialMatch}
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                open={partialMatch}
                path={item.path}
                title={item.title}
            >
                {renderNavItems({
                    depth: depth + 1,
                    items: item.children,
                    path,
                    t,
                })}
            </DashboardSidebarItem>
        );
    } else {
        acc.push(
            <DashboardSidebarItem
                active={
                    item.title === "Properties" && item.path === path
                        ? true
                        : partialMatch
                }
                chip={item.chip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                path={item.path}
                title={item.title}
            />
        );
    }

    return acc;
};

export const DashboardSidebarSection: FC<DashboardSidebarSectionProps> = (
    props
) => {
    const { items, path, title, ...other } = props;

    const { t } = useTranslation();

    return (
        <List
            subheader={
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        color: "neutral.500",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        lineHeight: 2.5,
                        ml: 4,
                        textTransform: "uppercase",
                    }}
                >
                    {/* {title} */}
                </ListSubheader>
            }
            {...other}
        >
            {renderNavItems({
                items,
                path,
                t,
            })}
        </List>
    );
};
