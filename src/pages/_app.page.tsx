import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import type { FC } from "react";
import { Provider as ReduxProvider } from "react-redux";
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

import { TabsProvider } from "src/contexts/tabs";

// DatePicker
import DatePickerProvider from "@/providers/DatePicker";

import { Toaster } from "react-hot-toast";
import NotificationsListener from "@/providers/NotificationsListener";

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
                <title>PropertyPro</title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
                <link rel="icon" href="/favicon-logo.ico" />
            </Head>

            <ReduxProvider store={store}>
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
                                    <TabsProvider>
                                        <Toaster position="top-right" />

                                        <NotificationsListener />

                                        <AuthConsumer>
                                            {(auth) =>
                                                !auth.isInitialized ? (
                                                    <SplashScreen />
                                                ) : (
                                                    <DatePickerProvider>
                                                        {getLayout(
                                                            <Component
                                                                {...pageProps}
                                                            />
                                                        )}
                                                    </DatePickerProvider>
                                                )
                                            }
                                        </AuthConsumer>
                                    </TabsProvider>
                                </ThemeProvider>
                            )}
                        </SettingsConsumer>
                    </SettingsProvider>
                </AuthProvider>
            </ReduxProvider>
        </CacheProvider>
    );
};

export default App;
