import { useTranslation } from "react-i18next";
import { Box, Container, Typography } from "@mui/material";

const NoLogsPlaceholder = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="500px"
            >
                <Typography variant="subtitle1" color="textSecondary">
                    {t("No results")}
                </Typography>
            </Box>
        </Container>
    );
};

export default NoLogsPlaceholder;
