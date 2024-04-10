// @mui
import { Theme, styled } from "@mui/material/styles";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledLabel = styled(Box)(({ theme }: { theme: Theme }) => ({
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
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.fontFamily,
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey?.[200]
            : theme.palette.neutral?.[700],
    fontWeight: theme.typography.fontWeightBold,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)", // Subtle shadow
    transition: "all 0.3s ease", // Smooth transitions
}));
