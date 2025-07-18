import { useTheme } from "@mui/material/styles";

const CustomActiveDot = (props: any) => {
    const { cx, cy } = props;
    const theme = useTheme();
    // fill not used for now.
    const fill =
        theme.palette.mode === "light"
            ? theme.palette.grey[400]
            : theme.palette.grey[700];

    if (cx == null || cy == null) return null;

    return (
        <circle
            cx={cx}
            cy={cy}
            r={3}
            fill={"none"}
            stroke={"none"}
            strokeWidth={1}
        />
    );
};

export default CustomActiveDot;
