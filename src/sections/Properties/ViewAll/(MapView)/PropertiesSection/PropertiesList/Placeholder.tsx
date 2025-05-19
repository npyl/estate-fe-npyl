import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";

const Placeholder = () => {
    const { t } = useTranslation();

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            p={3}
            textAlign="center"
            width={1}
            height={1}
            spacing={2}
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
        </Stack>
    );
};

export default Placeholder;
