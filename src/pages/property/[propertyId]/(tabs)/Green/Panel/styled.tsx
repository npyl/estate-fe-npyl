import { getBorderColor2 } from "@/theme/borderColor";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

export const PanelPaper = styled(Paper)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    width: "100%",
}));
