import { RefObject, useCallback, useLayoutEffect } from "react";
import sleep from "@/utils/sleep";
import { SidebarRef } from "./Sidebar";

type ClosestSection = {
    element: HTMLElement | null;
    distance: number;
};

const useClosestSection = (sidebarRef: RefObject<SidebarRef>) => {
    const onScrollEnd = useCallback(async () => {
        await sleep(500);

        const viewportCenter = window.innerHeight / 2;

        const sections = Array.from(
            document.querySelectorAll<HTMLElement>('[id^="NavSection-"]')
        );

        const closestSection = sections.reduce<ClosestSection>(
            (closest, section) => {
                const { top, height } = section.getBoundingClientRect();
                const distance = Math.abs(top + height / 2 - viewportCenter);
                return !closest.element || distance < closest.distance
                    ? { element: section, distance }
                    : closest;
            },
            { element: null, distance: Infinity }
        );

        if (!closestSection.element) return;

        const name = closestSection.element.id.slice(11);

        sidebarRef.current?.setValue(name);
    }, []);

    useLayoutEffect(() => {
        window.addEventListener("scrollend", onScrollEnd);
        return () => {
            window.removeEventListener("scrollend", onScrollEnd);
        };
    }, []);
};

export default useClosestSection;
