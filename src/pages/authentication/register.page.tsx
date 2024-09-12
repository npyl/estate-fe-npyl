import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { JWTRegister } from "../../components/authentication/jwt-register";
import { Logo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";

type Platform = "JWT";

const Register: NextPage = () => {
    const router = useRouter();
    const { platform }: { platform: Platform } = useAuth();
    const { disableGuard } = router.query;

    return (
        <>
            <Head>
                <title>Register | Material Kit Pro</title>
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
                            <Typography variant="h4">Register</Typography>
                            <Typography
                                color="textSecondary"
                                sx={{ mt: 2 }}
                                variant="body2"
                            >
                                Register on the internal platform
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                mt: 3,
                            }}
                        >
                            {platform === "JWT" && <JWTRegister />}
                        </Box>
                        <Divider sx={{ my: 3 }} />
                        <div>
                            <Link
                                href={
                                    disableGuard
                                        ? `/authentication/login?disableGuard=${disableGuard}`
                                        : "/authentication/login"
                                }
                            >
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Having an account
                                </Typography>
                            </Link>
                        </div>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

Register.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Register;
