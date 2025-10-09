// @mui
import { styled } from "@mui/material/styles";
import { Box, alpha } from "@mui/material";
import { LabelColor, LabelProps } from "./types";

// ----------------------------------------------------------------------

export const StyledLabel = styled(Box)<LabelProps>(({ theme, color }) => {
    const styles = color.startsWith("#")
        ? {
              color: theme.palette.text.primary,
              backgroundColor:
                  theme.palette.mode === "light"
                      ? theme.palette.grey?.[200]
                      : theme.palette.neutral?.[700],
          }
        : {
              color: theme.palette[color as LabelColor].light,
              backgroundColor: alpha(
                  theme.palette[color as LabelColor].main,
                  0.16
              ),
          };

    return {
        height: 28,
        minWidth: 28,
        lineHeight: "24px",
        borderRadius: 8,
        cursor: "default",
        alignItems: "center",
        whiteSpace: "nowrap",
        display: "inline-flex",
        textTransform: "capitalize",
        padding: theme.spacing(0, 1.5),
        fontSize: theme.typography.pxToRem(14),
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        transition: "all 0.3s ease", // Smooth transitionss
        ...styles,
    };
});
