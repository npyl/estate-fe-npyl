import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

const DragOverlayBg = styled("div")({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
});

const StyledTypography = styled(Typography)(({ theme }) => ({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2, 4),
    borderRadius: theme.shape.borderRadius,
    fontWeight: "bold",
    boxShadow: theme.shadows[4],
}));

const DragOverlay = () => {
    const { t } = useTranslation();

    return (
        <>
            <DragOverlayBg />
            <StyledTypography variant="h5">{t("Add images")}</StyledTypography>
        </>
    );
};

export default DragOverlay;
