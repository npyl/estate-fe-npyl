import { Box, Card, Container, Typography } from "@mui/material";
import JWTLogin from "@/sections/Login/JWTLogin";
import LogoVertical from "@/assets/logo/vertical/light";
import { useTranslation } from "react-i18next";
import { LanguageButtonAuth } from "@/components/language/LanguageButtonAuth";

const LoginSection = () => {
    const { t } = useTranslation();

    return (
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
            <Box
                sx={{
                    position: "absolute",
                    top: 16,
                    right: 10,
                    transform: "translateX(-50%)",
                    zIndex: 10,
                }}
            >
                <LanguageButtonAuth />
            </Box>{" "}
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
                    <LogoVertical
                        height={150}
                        style={{
                            // TODO: fix this with a better viewbox ?
                            marginLeft: "25px",
                        }}
                    />

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
                        <JWTLogin />
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default LoginSection;
