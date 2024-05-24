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
            paddingLeft: "10px",
        }}
        className={`flex flex-row gap-x-2 !bg-neutral-100 dark:!bg-neutral-700 items-center ${className}`}
        url={shareUrl}
    >
        <p>{label}</p>
        <Icon size={32} round />
    </Component>
);

export default Button;
