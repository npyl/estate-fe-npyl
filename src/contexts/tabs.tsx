import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { ITab } from "@/types/tabs";

type SubbarRef = {
    pushTab: (t: ITab) => void;
    removeTab: (identifier: string) => void;
    removeTabs: (identifiers: string[]) => void;

    isTabExistent: (p: string) => boolean | null;
    setTabPath: (p: string, newP: string) => void;
    getTabData: (identifier: string) => any;
};

type ITabState = SubbarRef & {
    setSubbar: Dispatch<SetStateAction<SubbarRef | undefined>>;
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
    const [subbar, setSubbar] = useState<SubbarRef>();

    const pushTab = (i: ITab) => {
        try {
            subbar?.pushTab(i);
        } catch (ex) {}
    };
    const removeTab = (p: string) => {
        try {
            subbar?.removeTab(p);
        } catch (ex) {}
    };
    const removeTabs = (p: string[]) => {
        try {
            subbar?.removeTabs(p);
        } catch (ex) {}
    };

    const isTabExistent = (p: string) => {
        try {
            return subbar?.isTabExistent(p) ?? null;
        } catch (ex) {
            return null;
        }
    };
    const setTabPath = (p: string, newP: string) => {
        try {
            subbar?.setTabPath(p, newP);
        } catch (ex) {}
    };
    const getTabData = (p: string) => {
        try {
            return subbar?.getTabData(p);
        } catch (ex) {}
    };

    return (
        <TabsContext.Provider
            value={{
                pushTab,
                removeTab,
                removeTabs,
                // ...
                isTabExistent,
                setTabPath,
                getTabData,
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
