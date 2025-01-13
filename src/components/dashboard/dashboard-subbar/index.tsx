import { SubbarRef } from "@/contexts/tabs";
import { forwardRef } from "react";
import DesktopBar from "./Desktop";

const Subbar = forwardRef<SubbarRef, object>(({}, ref) => (
    <DesktopBar ref={ref} />
));

Subbar.displayName = "Subbar";

export default Subbar;
