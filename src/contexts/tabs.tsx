import { createContext, useCallback, useContext, useState } from "react";
import { ITab } from "src/interfaces/tabs";

type ITabState = {
    appTabs: ITab[];
    setAppTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
    pushTab: (newTab: ITab) => void;
    removeTabNoChange: (identifier: string) => ITab[];
    removeTab: (identifier: string) => void;
};

const TabsContext = createContext<ITabState | undefined>(undefined);
export const useTabsContext = () => {
    const context = useContext(TabsContext);
    if (context === undefined) {
        throw new Error(
            "TabsContext value is undefined. Make sure you use the TabsContext before using the context."
        );
    }
    return context;
};

const useTabsState = () => {
    const [appTabs, setAppTabs] = useState<ITab[]>([]);
    const pushTab = useCallback(
        (value: ITab) =>
            setAppTabs((old) => {
                const exists = old.some((item) => item.id === value.id);

                return !exists
                    ? [...old, value] // add
                    : old.map((tab) => (tab.id === value.id ? value : tab)); // update
            }),
        []
    );

    const removeTab = useCallback(
        (identifier: string) =>
            setAppTabs((old) => old.filter((item) => item.id !== identifier)),
        []
    );

    const removeTabNoChange = useCallback(
        (identifier: string) =>
            appTabs.filter((item) => item.id !== identifier),
        [appTabs]
    );

    return {
        appTabs,
        pushTab,
        removeTab,
        setAppTabs,
        removeTabNoChange,
    };
};

export const TabsProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const value = useTabsState();
    return <TabsContext.Provider value={value} {...props} />;
};
