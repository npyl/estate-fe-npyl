import { forwardRef } from "react";
import { Box, IconButton, Tooltip, Typography, alpha } from "@mui/material";
//
import { StyledLabel } from "./styles";
import { LabelProps } from "./types";
// icons
import { Close as CloseIcon } from "@mui/icons-material";

// ----------------------------------------------------------------------

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
                pt: 0.25,
                px: 0.75,
                borderRadius: 10,
                gap: 0.3,
                display: "flex",
                alignItems: "center",
                maxWidth: "100%",
                ...sx,
            }}
            {...other}
        >
            {!opaque && (
                <Box
                    sx={{
                        mr: 0.75,
                        backgroundColor: alpha(color, opacity),
                        borderRadius: 10,
                        width: 12,
                        height: 12,
                        flexShrink: 0, // Prevents shrinking
                    }}
                />
            )}

            <Tooltip title={name} placement="top">
                <Box sx={{ minWidth: 0, flexGrow: 1, overflow: "hidden" }}>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                        }}
                    >
                        {name}
                    </Typography>
                </Box>
            </Tooltip>

            {children}

            {onClose && (
                <IconButton
                    size="small"
                    disabled={disabled}
                    onClick={onClose}
                    sx={{ borderRadius: "16px" }}
                >
                    <CloseIcon sx={{ height: 16, width: 16 }} />
                </IconButton>
            )}
        </StyledLabel>
    )
);

Label.displayName = "Label";

export default Label;
