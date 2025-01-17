import Stack from "@mui/material/Stack";
import {
    forwardRef,
    PropsWithChildren,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import React from "react";
import Tabs from "@mui/material/Tabs";
import getTab from "./Tab";
import { getSectionId } from "../NavSection";
import { SxProps, Theme } from "@mui/material";

// ------------------------------------------------------------------------

const TabSx: SxProps<Theme> = {
    top: "75px",
    position: "sticky",
    zIndex: 10,

    "& .MuiTabs-indicator": {
        height: "60px !important",
        left: 20,
    },
};

// ------------------------------------------------------------------------

interface SidebarRef {
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface SidebarProps extends PropsWithChildren {
    initial?: string;
}

const Sidebar = forwardRef<SidebarRef, SidebarProps>(
    ({ initial = "", children }, ref) => {
        const [value, setValue] = useState<string>(initial);

        useImperativeHandle(ref, () => ({ setValue }), []);

        const handleChange = useCallback((_: any, name: string) => {
            //
            // Scroll
            //
            const sectionId = getSectionId(name);
            const el = document.getElementById(sectionId);
            if (!el) return;

            window?.scroll({ top: el.offsetTop, behavior: "smooth" });

            setValue(name);
        }, []);

        return (
            <Stack>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    sx={TabSx}
                >
                    {React.Children.map(children, getTab)}
                </Tabs>
            </Stack>
        );
    }
);

export type { SidebarRef };
export default Sidebar;
