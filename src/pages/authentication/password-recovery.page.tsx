import { Box, Card, Container, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { GuestGuard } from "../../components/authentication/guest-guard";

import { Logo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import { useTranslation } from "react-i18next";

type Platform = "JWT";

const platformIcons: { [key in Platform]: string } = {
    JWT: "/static/icons/jwt.svg",
};

const PasswordRecovery: NextPage = () => {
    const { t } = useTranslation();
    const { platform }: { platform: Platform } = useAuth();

    useEffect(() => {
        gtm.push({ event: "page_view" });
    }, []);

    return (
        <>
            <Head>
                <title>{t("Password Recovery | Material Kit Pro")}</title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        py: {
                            xs: "60px",
                            md: "120px",
                        },
                    }}
                >
                    <Box
                        sx={{
                            alignItems: "center",
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark"
                                    ? "neutral.900"
                                    : "neutral.100",
                            borderColor: "divider",
                            borderRadius: 1,
                            borderStyle: "solid",
                            borderWidth: 1,
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            mb: 4,
                            p: 2,
                            "& > img": {
                                height: 32,
                                width: "auto",
                                flexGrow: 0,
                                flexShrink: 0,
                            },
                        }}
                    >
                        <Typography color="textSecondary" variant="caption">
                            {t("The app authenticates via")} {platform}
                        </Typography>
                        <img
                            alt="Auth platform"
                            src={platformIcons[platform]}
                        />
                    </Box>
                    <Card elevation={16} sx={{ p: 4 }}>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Link href="/">
                                <Logo
                                    sx={{
                                        height: 40,
                                        width: 40,
                                    }}
                                />
                            </Link>
                            <Typography variant="h4">
                                {t("Password Recovery")}
                            </Typography>
                            <Typography
                                color="textSecondary"
                                sx={{ mt: 2 }}
                                variant="body2"
                            >
                                {t(
                                    "Tell us your email so we can send you a reset link"
                                )}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                mt: 3,
                            }}
                        ></Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

PasswordRecovery.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordRecovery;
