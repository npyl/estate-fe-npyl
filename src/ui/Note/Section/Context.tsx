import { createContext, useContext } from "react";
import type { FC, PropsWithChildren } from "react";
import getIsControlled from "./getIsControlled";

interface State {
    isControlled?: boolean;
    onAdd?: (m: string) => void;
    onRemove?: (id: number) => void;
}

interface SettingsProviderProps
    extends PropsWithChildren<Omit<State, "isControlled">> {
    resourceId?: number;
}

const SettingsContext = createContext<State>({});

export const SettingsProvider: FC<SettingsProviderProps> = ({
    resourceId,
    onAdd,
    onRemove,
    children,
}) => {
    const isControlled = getIsControlled(resourceId);

    return (
        <SettingsContext.Provider
            value={{
                isControlled,
                onAdd,
                onRemove,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
