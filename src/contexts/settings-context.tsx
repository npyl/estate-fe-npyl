import { createContext, useCallback, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export interface Settings {
    direction?: "ltr" | "rtl";
    responsiveFontSizes?: boolean;
    theme: "light" | "dark";
}

export interface SettingsContextValue {
    settings: Settings;
    saveSettings: (update: Settings) => void;
}

interface SettingsProviderProps {
    children?: ReactNode;
}

const initialSettings: Settings = {
    direction: "ltr",
    responsiveFontSizes: true,
    theme: "light",
};

export const restoreSettings = (): Settings | null => {
    let settings = null;

    try {
        const storedData = globalThis.localStorage.getItem("settings");

        if (storedData) {
            settings = JSON.parse(storedData);
        } else {
            settings = {
                direction: "ltr",
                responsiveFontSizes: true,
                theme: globalThis.matchMedia("(prefers-color-scheme: dark)")
                    .matches
                    ? "dark"
                    : "light",
            };
        }
    } catch (err) {
        console.error(err);
        // If stored data is not a strigified JSON this will fail,
        // that's why we catch the error
    }

    return settings;
};

export const storeSettings = (settings: Settings): void => {
    globalThis.localStorage.setItem("settings", JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextValue>({
    settings: initialSettings,
    saveSettings: () => {},
});

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
    const { i18n } = useTranslation();

    const [settings, setSettings] = useState<Settings>(initialSettings);

    useEffect(() => {
        const restoredSettings = restoreSettings();

        if (restoredSettings) {
            setSettings(restoredSettings);
        }

        // Language (try to read localStorage; default to greek)
        const stored = localStorage.getItem("language") || "el";
        i18n.changeLanguage(stored);
    }, []);

    const saveSettings = useCallback((updatedSettings: Settings) => {
        setSettings(updatedSettings);
        storeSettings(updatedSettings);
    }, []);

    return (
        <SettingsContext.Provider
            value={{
                settings,
                saveSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const SettingsConsumer = SettingsContext.Consumer;
