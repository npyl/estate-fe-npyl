import { styled } from "@mui/material/styles";
import { FC, ReactNode, useRef } from "react";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import useDialog from "@/hooks/useDialog";
import Subbar from "./dashboard-subbar";
import { SubbarRef, TabsProvider } from "@/contexts/tabs";

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto",
    maxWidth: "100%",
    marginTop: 75,
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
        marginLeft: 200,
    },

    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));

const Nav = () => {
    const [isSidebarOpen, openSidebar, closeSidebar] = useDialog();
    return (
        <>
            <DashboardNavbar onOpenSidebar={openSidebar} />
            <DashboardSidebar onClose={closeSidebar} open={isSidebarOpen} />
        </>
    );
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const subbarRef = useRef<SubbarRef>(null);

    return (
        <>
            <DashboardLayoutRoot>
                <TabsProvider subbarRef={subbarRef}>
                    <Subbar ref={subbarRef} />
                    {children}
                </TabsProvider>
            </DashboardLayoutRoot>
            <Nav />
        </>
    );
};
