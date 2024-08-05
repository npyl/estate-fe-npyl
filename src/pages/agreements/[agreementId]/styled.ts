import MuiDivider from "@mui/material/Divider";
import MuiPaper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";

const Divider = styled(MuiDivider)({
    width: "100%",
});
const Paper = styled(MuiPaper)(({ theme }) => ({
    border: "1px solid",
    borderRadius: "15px",
    borderColor: getBorderColor2(theme),
}));

export { Divider, Paper };
