import type { Direction, Theme } from "@mui/material";
import {
    createTheme as createMuiTheme,
    responsiveFontSizes,
} from "@mui/material/styles";
import baseThemeOptions from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";
import { lightThemeOptions } from "./light-theme-options";

interface Neutral {
    100: string;
    200: string;
    250: string;
    300: string;
    350: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}

interface CreateFabLayout {
    bottom: number;
    right: number;
}

interface NavLayout {
    topbarHeight: number;
    sidebarWidth: number;
}

interface Layout {
    createFab: CreateFabLayout;
    nav: NavLayout;
}

declare module "@mui/material/styles" {
    interface Palette {
        neutral?: Neutral;
    }

    interface PaletteOptions {
        neutral?: Neutral;
    }

    interface ZIndex {
        sidebar: number;
        subbar: number;
        // ...
        modal: number; // INFO: make required
        // ...
        all: number; // INFO: "above all" (eg. for splash screen)
    }

    // ------------------------------------------

    interface Theme {
        layout: Layout;
    }

    interface ThemeOptions {
        layout: Layout;
    }
}

interface ThemeConfig {
    direction?: Direction;
    responsiveFontSizes?: boolean;
    mode: "light" | "dark";
}

const createTheme = (config: ThemeConfig): Theme => {
    let theme = createMuiTheme(
        baseThemeOptions,
        config.mode === "dark" ? darkThemeOptions : lightThemeOptions,
        {
            direction: config.direction,
        }
    );

    if (config.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return theme;
};

export default createTheme;
