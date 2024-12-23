import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ theme }) => ({
    width: "100%",

    color: theme.palette.info.main,
    backgroundColor: alpha(theme.palette.info.main, 0.3),

    border: "1px solid",
    borderColor: theme.palette.info.main,
    borderRadius: "5px",

    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    textAlign: "center",
}));

const Separator = () => {
    const { t } = useTranslation();

    return (
        <StyledTypography variant="h5">
            {t("Private_FEMININE")}
        </StyledTypography>
    );
};

export default Separator;
