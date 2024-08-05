import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import Stack from "@mui/material/Stack";

export const StyledStack = styled(Stack)(({ theme }) => ({
    border: "1px solid",
    borderRadius: "15px",
    borderColor: getBorderColor2(theme),
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[200]
            : theme.palette.neutral?.[800],
    padding: theme.spacing(1),
    gap: theme.spacing(1),
}));
