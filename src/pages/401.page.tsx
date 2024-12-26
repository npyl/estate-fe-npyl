import Link from "@/components/Link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const ERR_ADMIN_ONLY = "ERR_ADMIN_ONLY";
const ERR_ADMIN_ONLY_0 = "ERR_ADMIN_ONLY_0";

const AuthorizationRequired: NextPage = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <>
            <Head>
                <title>{t(ERR_ADMIN_ONLY)}</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    display: "flex",
                    flexGrow: 1,
                }}
            >
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

                    <Stack mt={6} justifyContent="center" direction="row">
                        <Button
                            LinkComponent={Link}
                            href="/"
                            variant="outlined"
                            sx={{ width: "max-content" }}
                        >
                            {t("Back")}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default AuthorizationRequired;
