import { Typography } from "@mui/material";
import { ComponentType } from "react";
import { SpaceBetween } from "../styled";

interface ButtonProps {
    Component: ComponentType<any>;
    Icon: React.FC<any>;
    label: string;
    shareUrl: string;
}

const Button: React.FC<ButtonProps> = ({
    Component,
    Icon,
    label,
    shareUrl,
}) => (
    <Component url={shareUrl}>
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
