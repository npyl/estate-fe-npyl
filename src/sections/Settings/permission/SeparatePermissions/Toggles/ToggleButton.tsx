import { MouseEvent, FC } from "react";
import IOSSwitch from "@/components/iOSSwitch";

interface ToggleButtonProps {
    userId: number;
    enabled: boolean;
    loading: boolean;
    toggleCb: any;
}

const ToggleButton: FC<ToggleButtonProps> = ({
    userId,
    enabled,
    loading,
    toggleCb,
}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleCb(userId);
    };

    return (
        <IOSSwitch disabled={loading} checked={enabled} onClick={handleClick} />
    );
};

export default ToggleButton;
