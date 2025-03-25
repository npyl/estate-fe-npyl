import {
    createContext,
    FC,
    PropsWithChildren,
    RefObject,
    useCallback,
    useContext,
} from "react";
import { ITab } from "@/types/tabs";

type ITabState = {
    pushTab: (t: ITab) => void;
    removeTab: (identifier: string) => void;
    removeTabs: (identifiers: string[]) => void;

    setTabPath: (p: string, newP: string) => void;
    getTabData: (identifier: string) => any;
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

export type SubbarRef = ITabState;

interface TabsProviderProps extends PropsWithChildren {
    subbarRef?: RefObject<SubbarRef>;
}

export const TabsProvider: FC<TabsProviderProps> = ({
    subbarRef,
    ...props
}) => {
    const pushTab = (i: ITab) => {
        try {
            subbarRef?.current?.pushTab(i);
        } catch (ex) {}
    };
    const removeTab = (p: string) => {
        try {
            subbarRef?.current?.removeTab(p);
        } catch (ex) {}
    };
    const removeTabs = (p: string[]) => {
        try {
            subbarRef?.current?.removeTabs(p);
        } catch (ex) {}
    };
    const setTabPath = useCallback((p: string, newP: string) => {
        try {
            subbarRef?.current?.setTabPath(p, newP);
        } catch (ex) {}
    }, []);
    const getTabData = useCallback((p: string) => {
        try {
            return subbarRef?.current?.getTabData(p);
        } catch (ex) {}
    }, []);

    return (
        <TabsContext.Provider
            value={{
                pushTab,
                removeTab,
                removeTabs,
                // ...
                setTabPath,
                getTabData,
            }}
            {...props}
        />
    );
};
