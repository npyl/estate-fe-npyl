import { forwardRef } from "react";
import { Box, IconButton, Typography, alpha } from "@mui/material";
//
import { StyledLabel } from "./styles";
import { LabelProps } from "./types";
// icons
import { Close as CloseIcon } from "@mui/icons-material";

// ----------------------------------------------------------------------

const iconStyle = {
    minWidth: 16,
    minHeight: 16,
    "& svg, img": { width: 1, height: 1, objectFit: "cover" },
};

const radius = 10;

const Label = forwardRef<HTMLDivElement, LabelProps>(
    (
        {
            children,
            name,
            color,
            opaque = false,
            opacity = 1,
            disabled,
            onClose,
            sx,
            ...other
        },
        ref
    ) => (
        <StyledLabel
            color={color}
            name={name}
            ref={ref}
            sx={{
                px: 0.75,
                borderRadius: radius,
                ...sx,
            }}
            {...other}
        >
            {opaque ? null : (
                <Box
                    sx={{
                        mr: 0.75,
                        ...sx,
                        backgroundColor: alpha(color, opacity),
                        borderRadius: radius,
                        ...iconStyle,
                    }}
                />
            )}

            <Typography variant="body2" noWrap textOverflow="ellipsis">
                {name}
            </Typography>

            {children}

            {onClose ? (
                <IconButton
                    size="small"
                    aria-label="close"
                    disabled={disabled}
                    onClick={onClose}
                >
                    <CloseIcon sx={{ height: 16, width: 16 }} />
                </IconButton>
            ) : null}
        </StyledLabel>
    )
);

Label.displayName = "Label";

export default Label;
