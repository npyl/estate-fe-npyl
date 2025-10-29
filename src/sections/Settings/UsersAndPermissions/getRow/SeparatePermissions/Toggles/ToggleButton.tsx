import { MouseEvent, FC } from "react";
import IOSSwitch from "@/components/iOSSwitch";
import FormControlLabel, {
    FormControlLabelProps,
} from "@mui/material/FormControlLabel";

interface ToggleButtonProps
    extends Omit<FormControlLabelProps, "control" | "labelPlacement"> {
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
    ...props
}) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleCb(userId);
    };

    return (
        <FormControlLabel
            control={
                <IOSSwitch
                    disabled={loading}
                    checked={enabled}
                    onClick={handleClick}
                />
            }
            sx={{ display: "flex", flexDirection: "row-reverse", gap: 1 }}
            {...props}
        />
    );
};

export type { ToggleButtonProps };
export default ToggleButton;
