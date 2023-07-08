import { Box, Button, ButtonProps, DialogContent, DialogContentProps, styled } from "@mui/material";

interface PriceButtonProps extends ButtonProps {
  open: boolean;
}

export const StyledPriceButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "open",
})<PriceButtonProps>(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,

  fontWeight: 400,
  color: theme.palette.neutral?.[500],
  fontSize: "16px",
  border: open
    ? `2px solid ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.divider}`,
  "&:hover": {
    border: open
      ? `2px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.common.black}`,
    background: theme.palette.common.white,
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: 35,
  border: 0,
  boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
  borderRadius: 4,
  background: theme.palette.common.white,
  p: 1,
}));

export const StyledDialogContent = styled(DialogContent, {
  shouldForwardProp: (prop) => prop !== "open",
})<DialogContentProps>(({ theme }) => ({
  maxHeight: "none",
  overflow: "visible"
}));