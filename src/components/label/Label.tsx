import { forwardRef } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
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

const Label = forwardRef<HTMLSpanElement, LabelProps>(
    (
        {
            children,
            color = "default",
            variant = "soft",
            opaque = false,
            disabled,
            opacity,
            onClose,
            sx,
            ...other
        },
        ref
    ) => {
        const theme = useTheme();

        return (
            <StyledLabel
                ref={ref}
                ownerState={{ color, variant, opacity }}
                sx={{
                    px: 0.75,
                    borderRadius: radius,
                }}
                theme={theme}
                {...other}
            >
                {opaque ? null : (
                    <Box
                        sx={{
                            mr: 0.75,
                            ...sx,
                            borderRadius: radius,
                            ...iconStyle,
                        }}
                    />
                )}

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
        );
    }
);

export default Label;
