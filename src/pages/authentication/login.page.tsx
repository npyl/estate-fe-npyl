import { Box, Card, Container, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { GuestGuard } from "@/components/authentication/guest-guard";
import { JWTLogin } from "@/components/authentication/jwt-login";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { useTranslation } from "react-i18next";

type Platform = "JWT";

const Login: NextPage = () => {
    const { t } = useTranslation();
    const { platform }: { platform: Platform } = useAuth();

    return (
        <>
            <Head>
                <title>{t("Login")}</title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundImage: "background.default",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <video
                    style={{
                        zIndex: -10,
                        filter: "blur(5px)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        objectFit: "cover",
                    }}
                    autoPlay
                    loop
                    muted
                >
                    <source
                        src="https://d1o8f6oijbfd0m.cloudfront.net/property_pro_login_video.mp4"
                        type="video/mp4"
                    />
                </video>
                <Container maxWidth="sm">
                    <Card
                        elevation={16}
                        sx={{
                            p: 4,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Link href="/" sx={{ marginBottom: 2 }}>
                            <Logo
                                sx={{
                                    height: 50,
                                    width: 50,
                                }}
                            />
                        </Link>
                        <Typography
                            variant="h4"
                            color="black"
                            sx={{ fontWeight: 600 }}
                        >
                            {t("Log in")}
                        </Typography>
                        <Typography
                            color="textSecondary"
                            sx={{ mt: 1, textAlign: "center" }}
                            variant="body2"
                        >
                            {t("Sign in on the internal platform")}
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                mt: 3,
                                width: "100%",
                            }}
                        >
                            {platform === "JWT" && <JWTLogin />}
                        </Box>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
