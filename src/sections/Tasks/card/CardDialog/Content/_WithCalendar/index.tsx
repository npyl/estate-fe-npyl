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

const useIsAssigneeSelected = () => {
    const userIds = useWatch<ICreateOrUpdateTaskReq>({ name: "userIds" });
    const userId = Array.isArray(userIds) ? (userIds[0] as number) : -1;
    return Boolean(userId);
};

const WithCalendar = () => {
    const isAssigneeSelected = useIsAssigneeSelected();
    const isOpen = useWatch<ICreateOrUpdateTaskReq>({ name: "withCalendar" });

    if (!isAssigneeSelected) return null;

    return (
        <Stack position="relative" spacing={1}>
            <WithCalendarSwitch />

            {isOpen ? (
                <IsAuthenticatedIndicator sx={OAuthButtonSx}>
                    <WorkspaceUserGuard>
                        <Pickers />
                    </WorkspaceUserGuard>
                </IsAuthenticatedIndicator>
            ) : null}
        </Stack>
    );
};

export default WithCalendar;
