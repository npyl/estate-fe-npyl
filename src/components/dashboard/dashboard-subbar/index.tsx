import { SubbarRef } from "@/contexts/tabs";
import useResponsive from "@/hooks/useResponsive";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
const FabMenu = dynamic(() => import("./Mobile"));
import DesktopBar from "./Desktop";

const Subbar = forwardRef<SubbarRef, object>(({}, ref) => {
    const belowLg = useResponsive("down", "lg");
    return belowLg ? <FabMenu /> : <DesktopBar ref={ref} />;
});

Subbar.displayName = "Subbar";

export default Subbar;
