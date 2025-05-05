import { Typography, TypographyProps, useMediaQuery } from "@mui/material";
import { FC } from "react";

interface CustomTypographyProps extends TypographyProps {
    label: string;
    count?: number;
}

const CustomTypography: FC<CustomTypographyProps> = ({
    label,
    count,
    ...props
}) => {
    const isLargeScreen = useMediaQuery("(min-width:1450px)");
    return (
        <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.primary"
            textAlign="center"
            {...props}
        >
            {label}
            {typeof count !== "undefined" && isLargeScreen && (
                <Typography
                    component="span"
                    variant="body2"
                    fontWeight="600"
                    ml={0.5}
                >
                    ({count})
                </Typography>
            )}
        </Typography>
    );
};

export default CustomTypography;
