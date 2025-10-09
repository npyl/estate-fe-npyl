import { styled, Theme } from "@mui/material/styles";

const getBgColor = ({ palette: { mode, neutral } }: Theme) =>
    mode === "light" ? neutral?.[200] : neutral?.[800];

const StyledImg = styled("img")(({ theme }) => ({
    backgroundColor: getBgColor(theme),
    borderRadius: theme.spacing(1),
}));

export default StyledImg;
