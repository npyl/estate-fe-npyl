import getBorderColor from "@/theme/borderColor";
import { Switch, SwitchProps } from "@mui/material";
import { styled } from "@mui/material/styles";
interface LabeledSwitchProps extends SwitchProps {
    labelOff: string;
    labelOn: string;
}

export const LabeledSwitch = styled(
    ({ labelOn, labelOff, ...props }: LabeledSwitchProps) => (
        <Switch {...props} />
    )
)<LabeledSwitchProps>(({ theme, labelOn, labelOff }) => {
    // Calculate the translate value based on the width of the track and the thumb
    const thumbWidth = 35; // The width of the thumb
    const trackPadding = 2 * 1; // Total padding (left + right)
    const totalWidth = 140; // The total width of the switch
    const translateXValue = totalWidth - thumbWidth - trackPadding - 2;

    return {
        width: `${totalWidth}px`,
        height: "50px",
        padding: "0px",

        "& .MuiSwitch-switchBase": {
            padding: "1px",

            "&.Mui-checked": {
                "& + .MuiSwitch-track": {
                    backgroundColor: "#2638a8",
                    opacity: 1,
                },
                "& .MuiSwitch-thumb": {
                    color: theme.palette.background.paper,
                },
                "& + .MuiSwitch-track:before": {
                    opacity: 0,
                },
                "& + .MuiSwitch-track:after": {
                    opacity: 1,
                },

                transform: `translate(${translateXValue}px)`,
            },
        },

        "& .MuiSwitch-thumb": {
            backgroundColor: "white",
            borderRadius: 5,
            width: "35px",
            height: "46px",
            margin: "1px",
        },

        "& .MuiSwitch-track": {
            backgroundColor: theme.palette.neutral?.[500],
            opacity: 1,
            "&:before, &:after": {
                content: '""',
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                fontSize: 15,
            },
            "&:before": {
                right: 8,
                content: `"${labelOff}"`,
            },
            "&:after": {
                left: 8,
                content: `"${labelOn}"`,
                opacity: 0,
            },
        },
    };
});
