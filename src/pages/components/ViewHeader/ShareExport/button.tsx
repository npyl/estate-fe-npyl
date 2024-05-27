import { ComponentType } from "react";

interface ButtonProps {
    Component: ComponentType<any>;
    icon: React.FC<any>;
    label: string;
    className?: string;
    shareUrl: string;
}

const Button: React.FC<ButtonProps> = ({
    Component,
    icon: Icon,
    label,
    className,
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
        className={`flex flex-row !bg-neutral-100 dark:!bg-neutral-700 ${className}`}
        url={shareUrl}
    >
        <p style={{ margin: 0 }}>{label}</p>
        <Icon size={24} round />
    </Component>
);

export default Button;
