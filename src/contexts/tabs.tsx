import {
    createContext,
    FC,
    PropsWithChildren,
    useCallback,
    useContext,
    useRef,
} from "react";
import { ITab } from "@/types/tabs";

type SubbarRef = {
    pushTab: (t: ITab, ud?: boolean) => void;
    removeTab: (identifier: string) => void;
    removeTabs: (identifiers: string[]) => void;

    setTabPath: (p: string, newP: string) => void;
};

type ITabState = SubbarRef & {
    setSubbar: (s: SubbarRef) => void;
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

const TabsProvider: FC<PropsWithChildren> = ({ children }) => {
    const subbar = useRef<SubbarRef>();
    const setSubbar = useCallback((s: SubbarRef) => {
        subbar.current = s;
    }, []);

    const pushTab = (i: ITab, ud?: boolean) => {
        try {
            subbar.current?.pushTab(i, ud);
        } catch (ex) {}
    };
    const removeTab = (p: string) => {
        try {
            subbar.current?.removeTab(p);
        } catch (ex) {}
    };
    const removeTabs = (p: string[]) => {
        try {
            subbar.current?.removeTabs(p);
        } catch (ex) {}
    };

    const setTabPath = (p: string, newP: string) => {
        try {
            subbar.current?.setTabPath(p, newP);
        } catch (ex) {}
    };

    return (
        <TabsContext.Provider
            value={{
                pushTab,
                removeTab,
                removeTabs,
                // ...
                setTabPath,
                // ...
                setSubbar,
            }}
        >
            {children}
        </TabsContext.Provider>
    );
};

export type { SubbarRef };
export default TabsProvider;
