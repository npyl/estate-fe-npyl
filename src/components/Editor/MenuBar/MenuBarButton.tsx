import { FC, ReactNode } from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import { useEditorContext } from "../context";

interface MenuBarButtonProps
    extends Omit<IconButtonProps, "color" | "size" | "children"> {
    name?: string;
    icon: ReactNode;
}

const MenuBarButton: FC<MenuBarButtonProps> = ({ name, icon, ...props }) => {
    const { editor } = useEditorContext();

    const color = name && editor!.isActive(name) ? "primary" : "default";

    return (
        <IconButton color={color} size="small" {...props}>
            {icon}
        </IconButton>
    );
};

export default MenuBarButton;
