import type { ButtonProps } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { shouldForwardProp as muiShouldForwardProp } from "@mui/system";

interface LeafButtonProps extends ButtonProps {
    isActive?: boolean;
}

const shouldForwardProp = (prop: PropertyKey) =>
    prop !== "isActive" && muiShouldForwardProp(prop);

const NavigationButton = styled(MuiButton, {
    shouldForwardProp,
})<LeafButtonProps>(({ theme, isActive = false }) => ({
    width: "100%",
    textDecoration: "none",
    borderRadius: theme.shape.borderRadius,
    color:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[700]
            : theme.palette.neutral?.[200],
    justifyContent: "flex-start",
    textAlign: "left",
    textTransform: "none",
    ...(isActive
        ? {
              backgroundColor:
                  theme.palette.mode === "light"
                      ? theme.palette.neutral?.[100]
                      : theme.palette.neutral?.[800],
              color: theme.palette.secondary.main,
              fontWeight: theme.typography.fontWeightBold,
          }
        : {}),
    "& .MuiButton-startIcon": {
        color: isActive
            ? theme.palette.secondary.main
            : theme.palette.neutral?.[400],
    },
    "&:hover": {
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.neutral?.[100]
                : theme.palette.neutral?.[800],
    },
}));

export default NavigationButton;
