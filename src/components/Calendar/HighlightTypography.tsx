import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

interface HighlightTypographyProps extends TypographyProps {
    highlight?: boolean;
}

const HighlightTypography: FC<HighlightTypographyProps> = ({
    highlight,
    ...props
}) => {
    const bgColor = highlight ? "primary.main" : "transparent";
    const color = highlight ? "background.paper" : "text.secondary";

    return <Typography bgcolor={bgColor} color={color} {...props} />;
};

export default HighlightTypography;
