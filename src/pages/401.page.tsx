import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ERR_ADMIN_ONLY_0 = "ERR_ADMIN_ONLY_0";

const AuthorizationRequired: NextPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Container maxWidth="lg">
            <Typography
                align="center"
                color="textSecondary"
                variant="h4"
                mt={0.5}
            >
                {t(ERR_ADMIN_ONLY_0)}
            </Typography>

            <Box mt={6} display="flex" justifyContent="center">
                <Box
                    alt="Under development"
                    component="img"
                    src={`/static/error/error401_${theme.palette.mode}.svg`}
                    width={400}
                    height="auto"
                    maxWidth="100%"
                />
            </Box>
        </Container>
    );
};

AuthorizationRequired.getLayout = (page) => (
    <DashboardLayout>{page}</DashboardLayout>
);

export default AuthorizationRequired;
