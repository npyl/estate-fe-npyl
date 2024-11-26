import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { TWeekViewMode } from "./types";

type Settings = {
    weekViewMode: TWeekViewMode;
    setWeekViewMode: Dispatch<SetStateAction<TWeekViewMode>>;
};

const SettingsContext = createContext<Settings>({
    weekViewMode: "monToSun",
    setWeekViewMode: () => {},
});

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error(
            "useSettingsContext value is undefined. Make sure you use the useSettingsContext before using the context."
        );
    }
    return context;
};

export const SettingsProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const [weekViewMode, setWeekViewMode] = useState<TWeekViewMode>("monToSun");

    return (
        <SettingsContext.Provider
            value={{
                weekViewMode,
                setWeekViewMode,
            }}
            {...props}
        />
    );
};
