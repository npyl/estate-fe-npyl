import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ERR_INTERNAL_SERVER_ERROR = "ERR_INTERNAL_SERVER_ERROR";

const ServerError: NextPage = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Container maxWidth="lg">
            <Typography align="center" variant="h4">
                {t(ERR_INTERNAL_SERVER_ERROR)}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 6,
                }}
            >
                <Box
                    alt="Under development"
                    component="img"
                    src={`/static/error/error500_${theme.palette.mode}.svg`}
                    sx={{
                        height: "auto",
                        maxWidth: "100%",
                        width: 400,
                    }}
                />
            </Box>
        </Container>
    );
};

ServerError.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ServerError;
