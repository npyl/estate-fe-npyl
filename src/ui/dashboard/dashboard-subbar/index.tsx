import { useRouter } from "next/router";
import SubbarItems from "./Items";
import { useCallback } from "react";
import { SubbarRef, useTabsContext } from "@/contexts/tabs";
import { SxProps, Theme } from "@mui/material";

const getSx = (isStickyPath: boolean): SxProps<Theme> => ({
    display: { xs: "none", lg: "flex" },
    position: isStickyPath ? "sticky" : "relative",
    top: isStickyPath ? 64 : 0,
    zIndex: ({ zIndex }) => zIndex.subbar,
});

const Subbar = () => {
    const router = useRouter();

    //use these two specific paths so the subbar is sticky in edit and create property form
    const isStickyPath =
        router.pathname.startsWith("/property/edit") ||
        router.pathname === "/property/create";

    const { setSubbar } = useTabsContext();
    const onRef = useCallback((s: SubbarRef | null) => {
        if (!s) return;
        setSubbar(s);
    }, []);

    return <SubbarItems ref={onRef} width={1} sx={getSx(isStickyPath)} />;
};

export default Subbar;
