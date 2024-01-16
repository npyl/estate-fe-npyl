import { HelpOutline } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Placeholder = () => {
    const { t } = useTranslation();

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                height: "100%",
                px: 1.5,
                py: 1.5,
                display: "flex",
            }}
            flexDirection={"column"}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10px",
                }}
            >
                <Typography flex={1} sx={{ justifyContent: "center" }}>
                    {t("Labels")}
                </Typography>

                <Tooltip title={t("Available only on View / Edit")}>
                    <HelpOutline />
                </Tooltip>
            </Box>
        </Box>
    );
};

export default Placeholder;
