import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";

const Placeholder = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column", // Changed to 'column' to stack icon and text
                justifyContent: "center",
                alignItems: "center",
                padding: 3, // Increased padding for more space
                backgroundColor: "background.default", // Use theme background color
                textAlign: "center",
                height: "100%", // Full height of the parent container
                gap: 2, // space between icon and text
            }}
        >
            <InfoIcon
                sx={{
                    color: "primary.main",
                    fontSize: "3rem",
                }}
            />
            <Typography
                variant="subtitle1"
                component="div"
                sx={{
                    color: "text.primary",
                    fontWeight: "medium",
                }}
            >
                {t("Draw on a location with markers")}
            </Typography>
        </Box>
    );
};

export default Placeholder;
