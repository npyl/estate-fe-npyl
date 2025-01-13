import { SpaceBetween } from "@/components/styled";
import { useRouter } from "next/router";
import SubbarItems from "./Items";
import Paper from "@mui/material/Paper";
import CreateButton from "@/components/dashboard/CreateButton";
import { forwardRef } from "react";
import { SubbarRef } from "@/contexts/tabs";

const DesktopBar = forwardRef<SubbarRef, object>(({}, ref) => {
    const router = useRouter();

    //use these two specific paths so the subbar is sticky in edit and create property form
    const isStickyPath =
        router.pathname.startsWith("/property/edit") ||
        router.pathname === "/property/create";

    return (
        <Paper
            component={SpaceBetween}
            alignItems="center"
            mb={1}
            p={1}
            gap={1}
            sx={{
                display: { xs: "none", lg: "flex" },
                position: isStickyPath ? "sticky" : "relative",
                top: isStickyPath ? 64 : 0,
                zIndex: 100,
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
        >
            <SubbarItems ref={ref} overflow="auto" width="90%" />

            <CreateButton />
        </Paper>
    );
});

DesktopBar.displayName = "DesktopBar";

export default DesktopBar;
