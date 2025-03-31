/**
 * integration with Calendar's DatePickers
 */

import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { SxProps, Theme } from "@mui/material";
import WorkspaceUserGuard from "./WorkspaceUserGuard";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
const IsAuthenticatedIndicator = dynamic(
    () => import("@/sections/Google/WorkspaceIndicator")
);
const Pickers = dynamic(() => import("./Pickers"));

const SwitchSx: SxProps<Theme> = {
    gap: 1,
    ml: 0,
    "& .MuiFormControlLabel-label": {
        color: "text.secondary",
    },
    alignSelf: "start",
};

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
    const { t } = useTranslation();

    const isAssigneeSelected = useIsAssigneeSelected();
    const isOpen = useWatch<ICreateOrUpdateTaskReq>({ name: "withCalendar" });

    if (!isAssigneeSelected) return null;

    return (
        <>
            <Divider />

            <Stack position="relative" spacing={1}>
                <RHFIOSSwitch
                    name="withCalendar"
                    label={t("Connect with Calendar")}
                    labelPlacement="start"
                    sx={SwitchSx}
                />

                {isOpen ? (
                    <IsAuthenticatedIndicator sx={OAuthButtonSx}>
                        <WorkspaceUserGuard>
                            <Pickers />
                        </WorkspaceUserGuard>
                    </IsAuthenticatedIndicator>
                ) : null}
            </Stack>

            <Divider />
        </>
    );
};

export default WithCalendar;
