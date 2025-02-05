import { FC } from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import useResponsive from "@/hooks/useResponsive";

interface ResponsiveTabsProps extends Omit<TabsProps, "orientation"> {}

const ResponsiveTabs: FC<ResponsiveTabsProps> = (props) => {
    const belowLg = useResponsive("down", "lg");
    const orientation = belowLg ? "horizontal" : "vertical";
    return <Tabs orientation={orientation} {...props} />;
};

export default ResponsiveTabs;
