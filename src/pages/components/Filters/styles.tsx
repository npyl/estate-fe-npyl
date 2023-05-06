import { Button, styled } from "@mui/material";

export const StyledPriceButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  minHeight: "56px",

  fontWeight: 500,
  color: theme.palette.neutral?.[500],
  fontSize: "16px",
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    borderColor: theme.palette.common.black,
    background: theme.palette.common.white,
  },
  "&:focus": {
    borderColor: theme.palette.common.black,
  },
}));
