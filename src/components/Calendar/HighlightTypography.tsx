import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

interface HighlightTypographyProps extends TypographyProps {
    highlight?: boolean;
    shape?: "circular" | "horizontal";
}

const HighlightTypography: FC<HighlightTypographyProps> = ({
    highlight,
    shape = "circular",
    ...props
}) => {
    const bgColor = highlight ? "primary.main" : "transparent";
    const color = highlight ? "background.paper" : "text.secondary";

    // INFO: min size for single-digit numbers
    const size =
        shape === "circular" ? { minWidth: "50px", minHeight: "50px" } : {};

    return (
        <Typography
            bgcolor={bgColor}
            color={color}
            textAlign="center"
            {...size}
            {...props}
        />
    );
};

export default HighlightTypography;
