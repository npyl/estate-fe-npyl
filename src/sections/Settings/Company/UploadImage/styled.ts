import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Image from "@/components/image";
import Box from "@mui/material/Box";

const StyledAvatar = styled(Image)(({ theme }) => ({
    border: "3px solid",
    borderColor: theme.palette.divider,
    borderRadius: "15px",
    cursor: "pointer",

    "&:hover": {
        borderColor: theme.palette.info.main,
    },
}));

const StyledButtonBackground = styled(Box)(({ theme }) => ({
    border: "1px solid",
    borderColor:
        theme.palette.mode === "light"
            ? theme.palette.neutral?.[300]
            : theme.palette.neutral?.[600],
    backgroundColor:
        theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.neutral?.[700],

    borderRadius: "20px",
}));

const ContentStack = styled(Stack)(({ theme }) => ({
    justifyContent: "center",
    alignItems: "center",

    position: "relative",

    width: "200px",
    height: "200px",

    bgcolor:
        theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.neutral?.[800],
}));

export { StyledAvatar, StyledButtonBackground, ContentStack };
