import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Toolbar,
    Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import type { FC } from "react";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "./logo";

interface MainNavbarProps {
    onOpenSidebar?: () => void;
}

export const MainNavbar: FC<MainNavbarProps> = (props) => {
    const { onOpenSidebar } = props;

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "background.paper",
                borderBottomColor: "divider",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                color: "text.secondary",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ minHeight: 64 }}>
                    <Link href="/">
                        <Logo
                            sx={{
                                display: {
                                    md: "inline",
                                    xs: "none",
                                },
                                height: 40,
                                width: 40,
                            }}
                        />
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        color="inherit"
                        onClick={onOpenSidebar}
                        sx={{
                            display: {
                                md: "none",
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box
                        sx={{
                            alignItems: "center",
                            display: {
                                md: "flex",
                                xs: "none",
                            },
                        }}
                    >
                        <Link href="/">
                            <Typography
                                color="textSecondary"
                                variant="subtitle2"
                            >
                                Live Demo
                            </Typography>
                        </Link>
                        <Link href="/browse">
                            <Typography
                                color="textSecondary"
                                sx={{ ml: 2 }}
                                variant="subtitle2"
                            >
                                Components
                            </Typography>
                        </Link>
                        <Link href="/docs/welcome">
                            <Typography
                                color="textSecondary"
                                sx={{ ml: 2 }}
                                variant="subtitle2"
                            >
                                Documentation
                            </Typography>
                        </Link>
                        <Button
                            component="a"
                            href="https://material-ui.com/store/items/devias-kit-pro"
                            size="medium"
                            sx={{ ml: 2 }}
                            target="_blank"
                            variant="contained"
                        >
                            Buy Now
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

MainNavbar.propTypes = {
    onOpenSidebar: PropTypes.func,
};
