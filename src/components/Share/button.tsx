import { ComponentType } from "react";

interface ButtonProps {
    Component: ComponentType<any>;
    icon: React.FC<any>;
    label: string;
    shareUrl: string;
}

const Button: React.FC<ButtonProps> = ({
    Component,
    icon: Icon,
    label,
    shareUrl,
}) => (
    <Component
        style={{
            borderRadius: "17px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            textAlign: "left",
        }}
        url={shareUrl}
    >
        <p style={{ margin: 0 }}>{label}</p>
        <Icon size={24} round />
    </Component>
);

export default Button;
