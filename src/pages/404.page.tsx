import { DashboardLayout } from "@/ui/dashboard/dashboard-layout";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

const ERR_PAGE_NOT_FOUND = "ERR_PAGE_NOT_FOUND";

const NotFound: NextPage = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Container maxWidth="lg">
            <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
                {t(ERR_PAGE_NOT_FOUND)}
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
                    src={`/static/error/error404_${theme.palette.mode}.svg`}
                    sx={{
                        height: "auto",
                        maxWidth: "100%",
                        width: 500,
                    }}
                />
            </Box>
        </Container>
    );
};

NotFound.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default NotFound;
