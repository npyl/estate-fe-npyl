import { HelpOutline } from "@mui/icons-material";
import { Box, Divider, Paper, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Placeholder = () => {
    const { t } = useTranslation();
    return (
        <Paper
            elevation={10}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100px", // fixed height
                padding: 0,
            }}
        >
            <Box
                sx={{
                    px: 3,
                    py: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h6">{t("Notes")}</Typography>
                <Tooltip title={t("Available only on View / Edit")}>
                    <HelpOutline />
                </Tooltip>
            </Box>
            <Divider />
        </Paper>
    );
};

export default Placeholder;
