import { Typography } from "@mui/material";
import { ComponentType } from "react";
import { SpaceBetween } from "../styled";

interface BaseComponentProps {
    url: string;
    children: any;
}

interface ButtonProps<T extends BaseComponentProps = BaseComponentProps> {
    Component: ComponentType<T>;
    ComponentProps?: Omit<T, "url" | "children">;
    Icon: React.FC<any>;
    label: string;
    shareUrl: string;
}

const Button = <T extends BaseComponentProps = BaseComponentProps>({
    Component,
    ComponentProps,
    Icon,
    label,
    shareUrl,
}: ButtonProps<T>) => (
    <Component url={shareUrl} {...((ComponentProps || {}) as any)}>
        <SpaceBetween
            width={1}
            textAlign="left"
            alignItems="center"
            className="PPShareButton"
            p={0.1}
            borderRadius={1}
        >
            <Typography variant="body1" color="text.secondary" width={1}>
                {label}
            </Typography>
            <Icon size={33} round />
        </SpaceBetween>
    </Component>
);

export default Button;
