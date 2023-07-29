import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import type { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SplashScreen } from "../components/splash-screen";
import { AuthConsumer, AuthProvider } from "../contexts/jwt-context";
import {
    SettingsConsumer,
    SettingsProvider,
} from "../contexts/settings-context";
import "../i18n";
import { store } from "../store";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";

// i18n
// import "../locales/i18n";
// scroll bar
// import "simplebar/src/simplebar.css";
// lightbox
// import "react-image-lightbox/style.css";
// map
// import "mapbox-gl/dist/mapbox-gl.css";
// editor
import "react-quill/dist/quill.snow.css";
// slick-carousel
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

type EnhancedAppProps = AppProps & {
    Component: NextPage;
    emotionCache: EmotionCache;
};

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App: FC<EnhancedAppProps> = (props) => {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>MordorEstate</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <ReduxProvider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <AuthProvider>
                        <SettingsProvider>
                            <SettingsConsumer>
                                {({ settings }) => (
                                    <ThemeProvider
                                        theme={createTheme({
                                            direction: settings.direction,
                                            responsiveFontSizes:
                                                settings.responsiveFontSizes,
                                            mode: settings.theme,
                                        })}
                                    >
                                        <CssBaseline />
                                        <ToastContainer position="top-center" />
                                        <AuthConsumer>
                                            {(auth) =>
                                                !auth.isInitialized ? (
                                                    <SplashScreen />
                                                ) : (
                                                    getLayout(
                                                        <Component
                                                            {...pageProps}
                                                        />
                                                    )
                                                )
                                            }
                                        </AuthConsumer>
                                    </ThemeProvider>
                                )}
                            </SettingsConsumer>
                        </SettingsProvider>
                    </AuthProvider>
                </LocalizationProvider>
            </ReduxProvider>
        </CacheProvider>
    );
};

export default App;
