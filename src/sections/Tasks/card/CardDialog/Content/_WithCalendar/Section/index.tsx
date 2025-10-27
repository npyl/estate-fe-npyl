import { useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import WorkspaceUserGuard from "./WorkspaceUserGuard";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import WithCalendarSwitch from "./WithCalendarSwitch";
const IsAuthenticatedIndicator = dynamic(
    () => import("@/sections/Google/WorkspaceIndicator")
);
const Pickers = dynamic(() => import("./Pickers"));

const OAuthButtonSx: SxProps<Theme> = {
    position: "absolute",
    right: 0,
    top: -20,
};

const Section = () => {
    const isOpen = useWatch<ICreateOrUpdateTaskReq>({ name: "withCalendar" });

    return (
        <WorkspaceUserGuard>
            <WithCalendarSwitch />

            {isOpen ? (
                <Stack position="relative" spacing={1}>
                    <IsAuthenticatedIndicator sx={OAuthButtonSx}>
                        <Pickers />
                    </IsAuthenticatedIndicator>
                </Stack>
            ) : null}
        </WorkspaceUserGuard>
    );
};

export default Section;
