import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren, useRef } from "react";
import React from "react";
import { getSection } from "./NavSection";
import Sidebar, { SidebarRef } from "./Sidebar";
import useClosestSection from "./useClosestSection";

// ----------------------------------------------------------------------------

interface LayoutProps extends PropsWithChildren {
    initial?: string;
    children: React.ReactElement[];
}

const Layout: FC<LayoutProps> = ({ initial, children }) => {
    const sidebarRef = useRef<SidebarRef>(null);

    useClosestSection(sidebarRef);

    return (
        <Stack direction="row-reverse" spacing={1}>
            {/* Sidebar */}
            <Sidebar ref={sidebarRef} initial={initial} children={children} />

            {/* Content */}
            <Stack width={1} overflow="hidden auto" spacing={1}>
                {React.Children.map(children, getSection)}
            </Stack>
        </Stack>
    );
};

export default Layout;
