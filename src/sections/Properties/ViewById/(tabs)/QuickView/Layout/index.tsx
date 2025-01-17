import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren, useCallback, useState } from "react";
import React from "react";
import Tabs from "@mui/material/Tabs";
import { SxProps, Theme } from "@mui/material";
import getTab from "./Tab";
import { getSection, getSectionId } from "./NavSection";

// -----------------------------------------------------------------------

interface SidebarProps extends PropsWithChildren {
    initial?: string;
}

const Sidebar: FC<SidebarProps> = ({ initial = "", children }) => {
    const [value, setValue] = useState<string>(initial);

    const handleChange = useCallback((_: any, name: string) => {
        //
        // Scroll
        //
        const sectionId = getSectionId(name);
        const el = document.getElementById(sectionId);
        if (!el) return;

        window?.scroll({ top: el.offsetTop, behavior: "smooth" });

        setValue(name);
    }, []);

    return (
        <Stack>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={TabSx}
            >
                {React.Children.map(children, getTab)}
            </Tabs>
        </Stack>
    );
};

// -----------------------------------------------------------------------

const TabSx: SxProps<Theme> = {
    top: "75px",
    position: "sticky",
    zIndex: 10,

    "& .MuiTabs-indicator": {
        height: "60px !important",
        left: 20,
    },
};

interface LayoutProps extends PropsWithChildren {
    initial?: string;
    children: React.ReactElement[];
}

const Layout: FC<LayoutProps> = ({ initial, children }) => {
    return (
        <Stack direction="row-reverse" spacing={1}>
            {/* Sidebar */}
            <Sidebar initial={initial} children={children} />

            {/* Content */}
            <Stack width={1} overflow="hidden auto" spacing={1}>
                {React.Children.map(children, getSection)}
            </Stack>
        </Stack>
    );
};

export default Layout;
