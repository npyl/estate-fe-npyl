import { useRouter } from "next/router";
import SubbarItems from "./Items";
import { forwardRef } from "react";
import { SubbarRef } from "@/contexts/tabs";

const DesktopBar = forwardRef<SubbarRef, object>(({}, ref) => {
    const router = useRouter();

    //use these two specific paths so the subbar is sticky in edit and create property form
    const isStickyPath =
        router.pathname.startsWith("/property/edit") ||
        router.pathname === "/property/create";

    return (
        <SubbarItems
            ref={ref}
            overflow="auto"
            width={1}
            sx={{
                display: { xs: "none", lg: "flex" },
                position: isStickyPath ? "sticky" : "relative",
                top: isStickyPath ? 64 : 0,
                zIndex: 100,
            }}
        />
    );
});

DesktopBar.displayName = "DesktopBar";

export default DesktopBar;
