import Stack, { StackProps } from "@mui/material/Stack";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import React from "react";
import getTab from "./Tab";
import { getSectionId } from "../NavSection";
import { SxProps, Theme } from "@mui/material";
import ResponsiveTabs from "./ResponsiveTabs";

// ------------------------------------------------------------------------

const TabSx: SxProps<Theme> = {
    top: "75px",
    position: "sticky",
    zIndex: 10,

    "& .MuiTabs-indicator": {
        height: { xs: "2px", lg: "60px" },
        left: { xs: "initial", lg: 20 },
    },
};

// ------------------------------------------------------------------------

interface SidebarRef {
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface SidebarProps extends StackProps {
    initial?: string;
}

const Sidebar = forwardRef<SidebarRef, SidebarProps>(
    ({ initial = "", children, ...props }, ref) => {
        const [value, setValue] = useState<string>(initial);

        useImperativeHandle(ref, () => ({ setValue }), []);

        const handleChange = useCallback((_: any, name: string) => {
            //
            // Scroll
            //
            const sectionId = getSectionId(name);
            const el = document.getElementById(sectionId);
            if (!el) return;

            window?.scroll({ top: el.offsetTop - 70, behavior: "smooth" });

            setValue(name);
        }, []);

        return (
            <Stack {...props}>
                <ResponsiveTabs
                    value={value}
                    onChange={handleChange}
                    sx={TabSx}
                >
                    {React.Children.map(children, getTab)}
                </ResponsiveTabs>
            </Stack>
        );
    }
);

export type { SidebarRef };
export default Sidebar;
