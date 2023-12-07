import { createContext, useCallback, useContext, useState } from "react";
import { ITab } from "src/interfaces/tabs";

type ITabState = {
    appTabs: ITab[];
    setAppTabs: React.Dispatch<React.SetStateAction<ITab[]>>;
    pushTab: (newTab: ITab) => void;
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
        (value: ITab) => {
            const exists = appTabs.some((item) => item.id === value.id);
            if (!exists) {
                // add
                setAppTabs((prev) => [...prev, value]);
            } else {
                // update
                setAppTabs((prev) =>
                    prev.map((tab) => (tab.id === value.id ? value : tab))
                );
            }
        },
        [appTabs, setAppTabs]
    );

    const removeTab = useCallback(
        (identifier: string) => {
            const temp = appTabs.filter((item) => item.id !== identifier);

            setAppTabs(temp);
        },
        [appTabs, setAppTabs]
    );

    return {
        appTabs,
        pushTab,
        removeTab,
        setAppTabs,
    };
};

export const TabsProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const value = useTabsState();

    return <TabsContext.Provider value={value} {...props} />;
};
