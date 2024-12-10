import { RefObject, useLayoutEffect } from "react";
import useResponsive from "@/hooks/useResponsive";

const useStickyPoint = (
    startRef: RefObject<HTMLDivElement>,
    targetRef: RefObject<HTMLDivElement>
) => {
    const belowMd = useResponsive("down", "md");

    useLayoutEffect(() => {
        if (belowMd) return;
        if (!startRef.current || !targetRef.current) return;

        const initialTop = startRef.current.offsetTop;

        const handleResize = () => {
            if (!targetRef.current) return;
            targetRef.current.style.bottom = `calc(100vh - ${
                initialTop + 720
            }px)`;
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [belowMd]);
};

export default useStickyPoint;
