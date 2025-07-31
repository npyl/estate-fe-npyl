import { Box, Typography } from "@mui/material";
import { RHFRating } from "@/components/hook-form";
import { useTranslation } from "react-i18next";

const Rating = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                height: "100%",
                px: 3,
                py: 1.5,
                display: "flex",
                justifyContent: "center",
            }}
            flexDirection={"column"}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6">{t("Status")}</Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 1.5,
                }}
            >
                <RHFRating name="status" />
            </Box>
        </Box>
    );
};

export default Rating;
