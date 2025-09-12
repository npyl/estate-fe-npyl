import isFalsy from "@/utils/isFalsy";
import { Typography, TypographyProps } from "@mui/material";
import { FC } from "react";

interface CustomTypographyProps extends TypographyProps {
    label: string;
    count?: number;
}

const CustomTypography: FC<CustomTypographyProps> = ({
    label,
    count,
    ...props
}) => (
    <Typography
        variant="subtitle2"
        fontWeight={600}
        color="text.primary"
        textAlign="center"
        {...props}
    >
        {label}

        {isFalsy(count) ? null : (
            <Typography
                component="span"
                variant="body2"
                fontWeight="600"
                ml={0.5}
                display={{ xs: "none", lg: "block" }}
            >
                ({count})
            </Typography>
        )}
    </Typography>
);

export default CustomTypography;
