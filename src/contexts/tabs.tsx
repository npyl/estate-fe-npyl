import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import { SxProps } from "@mui/system";
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

const CustomTabs: React.FC = () => {
    const { appTabs, pushTab, removeTab } = useTabsContext();
    const isMobile = useMediaQuery("(max-width:600px)"); // Adjust the breakpoint as needed

    const tabsSx: SxProps = {
        "&.MuiTabs-flexContainer": {
            overflowX: "auto",
            overflowY: "hidden",
            flexWrap: "nowrap",
        },
        "&.MuiTab-root": {
            minWidth: 0,
            flex: 1,
        },
    };

    return (
        <Box>
            <Tabs
                value={0} // Initialize with the first tab
                sx={tabsSx}
                variant={isMobile ? "scrollable" : "scrollable"}
            >
                {appTabs.map((tab, index) => (
                    <Tab key={tab.id} label={tab.label} />
                ))}
            </Tabs>
        </Box>
    );
};

export default CustomTabs;
