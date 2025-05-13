import { styled } from "@mui/material";
import { SpaceBetween } from "@/components/styled";

const StyledStack = styled(SpaceBetween)(({ theme }) => ({
    width: "100%",

    padding: theme.spacing(1),
    gap: theme.spacing(1),

    alignItems: "center",

    cursor: "pointer",

    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.neutral?.[700],

    borderRadius: theme.spacing(1),

    "&:hover": {
        backgroundColor:
            theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.neutral?.[500],
    },
}));

export { StyledStack };
