import { getBorderColor2 } from "@/theme/borderColor";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const PopoverPaper = styled(Paper)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    padding: theme.spacing(2),

    zIndex: 3000,
    width: "100%",

    marginTop: theme.spacing(1),

    maxHeight: "max-content",
}));

export default PopoverPaper;
