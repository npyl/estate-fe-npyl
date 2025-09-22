import { createContext, useContext } from "react";
import type { FC, PropsWithChildren } from "react";
import getIsControlled from "./getIsControlled";

interface State {
    isControlled?: boolean;
    onLabelClick?: (id: number) => void;
    onLabelRemove?: (id: number) => void;
}

interface SettingsProviderProps
    extends PropsWithChildren<Omit<State, "isControlled">> {
    resourceId?: number;
}

const SettingsContext = createContext<State>({});

export const SettingsProvider: FC<SettingsProviderProps> = ({
    resourceId,
    onLabelClick,
    onLabelRemove,
    children,
}) => {
    const isControlled = getIsControlled(resourceId);

    return (
        <SettingsContext.Provider
            value={{
                isControlled,
                onLabelClick,
                onLabelRemove,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
