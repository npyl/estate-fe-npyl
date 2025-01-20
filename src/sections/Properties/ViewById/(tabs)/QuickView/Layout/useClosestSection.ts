import { RefObject, useCallback, useLayoutEffect, useRef } from "react";
import { SidebarRef } from "./Sidebar";

const OFFSET_TOP = 0; // pixels from top

const findFirstSectionAfterOffset = () => {
    const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[id^="NavSection-"]')
    );

    // Find the first section whose top edge is below our offset
    const firstSection = sections.find((section) => {
        const { top } = section.getBoundingClientRect();
        return top >= OFFSET_TOP;
    });

    return firstSection || null;
};

const useClosestSection = (sidebarRef: RefObject<SidebarRef>) => {
    const isProgrammaticScroll = useRef(false);

    const onScroll = useCallback(async () => {
        if (isProgrammaticScroll.current) {
            isProgrammaticScroll.current = false;
            return;
        }

        const currentSection = findFirstSectionAfterOffset();
        if (!currentSection) return;

        const name = currentSection.id.slice(11);
        sidebarRef.current?.setValue(name);
    }, []);

    useLayoutEffect(() => {
        //
        // Override scroll methods
        //
        const originalScroll = window.scroll;

        window.scroll = (...args: any) => {
            isProgrammaticScroll.current = true;
            return originalScroll.apply(window, args);
        };

        window.addEventListener("scrollend", onScroll);

        return () => {
            window.scroll = originalScroll;
            window.removeEventListener("scrollend", onScroll);
        };
    }, []);
};

export default useClosestSection;
