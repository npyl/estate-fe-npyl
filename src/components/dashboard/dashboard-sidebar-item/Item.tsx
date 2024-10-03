import type { ListItemProps } from "@mui/material";
import { Box, Collapse, ListItem } from "@mui/material";
import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";
import { ChevronDown as ChevronDownIcon } from "../../../assets/icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "../../../assets/icons/chevron-right";
import NextLink from "next/link";
import NavigationButton from "./styled";

interface DashboardSidebarItemProps extends ListItemProps {
    active?: boolean;
    children?: ReactNode;
    chip?: ReactNode;
    depth: number;
    icon?: ReactNode;
    info?: ReactNode;
    open?: boolean;
    path?: string;
    title: string;
}

const DashboardSidebarItem: FC<DashboardSidebarItemProps> = ({
    active = false,
    children,
    chip,
    depth,
    icon,
    info,
    open: openProp,
    path,
    title,
    ...other
}) => {
    const [open, setOpen] = useState<boolean>(!!openProp);
    const handleToggle = (): void => {
        setOpen((prevOpen) => !prevOpen);
    };

    let paddingLeft = 24;

    if (depth > 0) {
        paddingLeft = 32 + 8 * depth;
    }

    const handleNavigate = useCallback(() => {
        localStorage.removeItem("propertyPaginationState");
        localStorage.removeItem("customerPaginationState");
        localStorage.removeItem("scrollHeight");
    }, []);

    // Branch
    if (children) {
        return (
            <ListItem
                disableGutters
                sx={{
                    display: "block",
                    mb: 0.5,
                    py: 0,
                    px: 2,
                }}
                {...other}
            >
                <NavigationButton
                    component={NextLink}
                    href={path}
                    // ...
                    endIcon={
                        !open ? (
                            <ChevronRightIcon fontSize="small" />
                        ) : (
                            <ChevronDownIcon fontSize="small" />
                        )
                    }
                    disableRipple
                    onClick={handleToggle}
                    startIcon={icon}
                    sx={{
                        pl: `${paddingLeft}px`,
                        pr: 3,
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                    {info}
                </NavigationButton>
                <Collapse in={open} sx={{ mt: 0.5 }}>
                    {children}
                </Collapse>
            </ListItem>
        );
    }

    // Leaf
    return (
        <ListItem
            disableGutters
            sx={{
                display: "flex",
                py: 0,
                px: 1.5,
            }}
        >
            <NavigationButton
                component={NextLink}
                href={path}
                // ...
                isActive={active}
                onClick={handleNavigate}
                startIcon={icon}
                endIcon={chip}
                disableRipple
                sx={{
                    pl: `${paddingLeft}px`,
                    pr: 3,
                }}
            >
                <Box sx={{ flexGrow: 1 }}>{title}</Box>
                {info}
            </NavigationButton>
        </ListItem>
    );
};

export default DashboardSidebarItem;
