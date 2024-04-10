import { forwardRef } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, alpha } from "@mui/material";
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
            color,
            opaque = false,
            opacity = 1,
            disabled,
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
                sx={{
                    px: 0.75,
                    borderRadius: radius,
                    ...sx,
                }}
                theme={theme}
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
