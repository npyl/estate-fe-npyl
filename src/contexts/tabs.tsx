import {
    createContext,
    FC,
    PropsWithChildren,
    RefObject,
    useContext,
} from "react";
import { ITab } from "@/types/tabs";

type ITabState = {
    pushTab: (t: ITab) => void;
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

export type SubbarRef = {
    pushTab: (i: ITab) => void;
    removeTab: (p: string) => void;
};

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

    return (
        <TabsContext.Provider
            value={{
                pushTab,
                removeTab,
            }}
            {...props}
        />
    );
};
