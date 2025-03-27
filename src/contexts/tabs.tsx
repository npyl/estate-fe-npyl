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
    pushTab: (t: ITab, ud?: boolean) => void;
    removeTab: (identifier: string) => void;
    removeTabs: (identifiers: string[]) => void;

    setTabPath: (p: string, newP: string) => void;
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

    const pushTab = (i: ITab, ud?: boolean) => {
        try {
            subbar?.pushTab(i, ud);
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

    const setTabPath = (p: string, newP: string) => {
        try {
            subbar?.setTabPath(p, newP);
        } catch (ex) {}
    };
<<<<<<< Updated upstream
    const getTabData = (p: string) => {
        try {
            return subbar?.getTabData(p);
        } catch (ex) {}
    };
=======
>>>>>>> Stashed changes

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
