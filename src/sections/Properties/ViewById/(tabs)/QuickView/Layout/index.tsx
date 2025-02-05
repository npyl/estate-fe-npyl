import Stack from "@mui/material/Stack";
import { FC, PropsWithChildren, ReactNode, useRef } from "react";
import React from "react";
import { getSection } from "./NavSection";
import Sidebar, { SidebarRef } from "./Sidebar";
import useClosestSection from "./useClosestSection";
import useCookie from "@/hooks/useCookie";
import CookieNames from "@/constants/cookies";
import { PPQuickViewLayoutCookie } from "@/sections/Properties/ViewById/PanelWithQuickView/types";
import isNamedComponent from "./isNamedComponent";

// ----------------------------------------------------------------------------

const getWithPermittedName =
    (sectionNames: string[]) => (content: ReactNode) => {
        if (!isNamedComponent(content))
            throw new Error("Invalid section component");

        const name = content.type.name;

        if (!sectionNames.includes(name)) return null;

        return content;
    };

const useFilteredChildern = (children: React.ReactElement[]) => {
    const [layout] = useCookie<PPQuickViewLayoutCookie>(cookieName, {
        sectionNames: [],
    });

    const { sectionNames } = layout;

    return React.Children.map(children, getWithPermittedName(sectionNames));
};

// -----------------------------------------------------------------

const cookieName = CookieNames.QuickViewLayout;

interface LayoutProps extends PropsWithChildren {
    initial?: string;
    children: React.ReactElement[];
}

const Layout: FC<LayoutProps> = ({ initial, children }) => {
    const sidebarRef = useRef<SidebarRef>(null);

    useClosestSection(sidebarRef);

    const filtered = useFilteredChildern(children);

    return (
        <Stack direction={{ xs: "column", lg: "row-reverse" }} spacing={3}>
            {/* Sidebar */}
            <Sidebar
                ref={sidebarRef}
                initial={initial}
                width={{ xs: "100%", lg: "20%" }}
            >
                {filtered}
            </Sidebar>

            {/* Content */}
            <Stack width={1} overflow="hidden auto" spacing={1}>
                {filtered.map(getSection)}
            </Stack>
        </Stack>
    );
};

export default Layout;
