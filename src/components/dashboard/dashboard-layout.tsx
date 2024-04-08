import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { FC, ReactNode } from "react";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import useDialog from "@/hooks/useDialog";
import Subbar from "./dashboard-subbar";

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

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, openSidebar, closeSidebar] = useDialog();

    return (
        <>
            <DashboardLayoutRoot>
                <Subbar />
                {children}
            </DashboardLayoutRoot>
            <DashboardNavbar onOpenSidebar={openSidebar} />
            <DashboardSidebar onClose={closeSidebar} open={isSidebarOpen} />
        </>
    );
};

DashboardLayout.propTypes = {
    children: PropTypes.node,
};
