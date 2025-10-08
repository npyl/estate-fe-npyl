import { forwardRef } from "react";
import { Box, IconButton, alpha } from "@mui/material";
import { StyledLabel } from "./styles";
import { LabelProps } from "./types";
import { Close as CloseIcon } from "@mui/icons-material";
import TypographyWithTooltip from "../TypographyWithTooltip";

const LabelClassName = "PPLabelClassName";

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
            className={LabelClassName}
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

            <TypographyWithTooltip variant="body2" maxWidth="100%">
                {name}
            </TypographyWithTooltip>

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

export { LabelClassName };
export default Label;
