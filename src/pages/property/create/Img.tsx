import { useTheme } from "@mui/material";
import { useMemo } from "react";

interface Props {
    src: string;
}

const Img = ({ src }: Props) => {
    const theme = useTheme();
    const isDark = useMemo(
        () => theme.palette.mode === "dark",
        [theme.palette.mode]
    );

    return (
        <img
            src={src}
            style={{
                filter: isDark
                    ? "brightness(0) saturate(100%) invert(41%) sepia(10%) saturate(1037%) hue-rotate(176deg) brightness(93%) contrast(88%)"
                    : "brightness(0) saturate(100%) invert(0)",
            }}
        />
    );
};

export default Img;
