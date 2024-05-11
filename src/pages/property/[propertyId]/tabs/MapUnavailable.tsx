import { LocationOff } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const StyledStack = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 1,
    color: theme.palette.grey[500],
}));

const MapUnavailable = () => {
    const { t } = useTranslation();

    return (
        <StyledStack>
            <LocationOff style={{ fontSize: 70 }} color="action" />

            <Typography variant="h5" gutterBottom>
                {t("No location data available")}
            </Typography>

            <Typography variant="subtitle1" color="textSecondary">
                {t("Please check the property details or try again later.")}
            </Typography>
        </StyledStack>
    );
};

export default MapUnavailable;
