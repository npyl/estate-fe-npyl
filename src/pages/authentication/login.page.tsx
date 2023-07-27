import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { JWTLogin } from "../../components/authentication/jwt-login";
import { Logo } from "../../components/logo";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";
import { useTranslation } from "react-i18next";

type Platform = "JWT";

const platformIcons: { [key in Platform]: string } = {
	JWT: "/static/icons/jwt.svg",
};

const Login: NextPage = () => {
	const { t } = useTranslation();
	const { platform }: { platform: Platform } = useAuth();

	useEffect(() => {
		gtm.push({ event: "page_view" });
	}, []);

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
				}}
			>
				<video
					style={{
						zIndex: -10,
						filter: `blur("5px")`,
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
					<source src="/static/background/site.mp4" type="video/mp4" />
				</video>
				<Container
					maxWidth="sm"
					sx={{
						py: {
							xs: "60px",
							md: "120px",
						},
					}}
				>
					<Card
						elevation={16}
						sx={{ p: 4, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
					>
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
							<Typography variant="h4">{t("Log in")}</Typography>
							<Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
								{t("Sign in on the internal platform")}
							</Typography>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								mt: 3,
							}}
						>
							{platform === "JWT" && <JWTLogin />}
						</Box>
						<Divider sx={{ my: 3 }} />
					</Card>
				</Container>
			</Box>
		</>
	);
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
