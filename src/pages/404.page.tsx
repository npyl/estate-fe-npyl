import {
    Box,
    Button,
    Container,
    Link,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { NextPage } from "next";
import Head from "next/head";

const NotFound: NextPage = () => {
    const theme = useTheme();
    const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
            <Head>
                <title>Error: Not Found | Material Kit Pro</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: "center",
                    backgroundColor: "background.paper",
                    display: "flex",
                    flexGrow: 1,
                    py: "80px",
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        align="center"
                        variant={mobileDevice ? "h4" : "h1"}
                    >
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="textSecondary"
                        sx={{ mt: 0.5 }}
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by
                        mistake. Whichever it is, try using the navigation.
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
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: 6,
                        }}
                    >
                        <Link href="/">
                            <Button variant="outlined">
                                Back to Dashboard
                            </Button>
                        </Link>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default NotFound;
