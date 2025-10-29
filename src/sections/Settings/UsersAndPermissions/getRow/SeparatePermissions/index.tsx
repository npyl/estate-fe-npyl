import { IUser } from "@/types/user";
import { Stack } from "@mui/material";
import { FC } from "react";
import {
    ToggleAgreements,
    ToggleMessages,
    ToggleNotifications,
} from "./Toggles";
import TaskView from "./TaskView";

// -------------------------------------------------------------------------------------

interface RowProps {
    user: IUser;
}

const SeparatePermissions: FC<RowProps> = ({ user }) => {
    const {
        id,
        notificationsEnabled,
        agreementsEnabled,
        messagingEnabled,
        tasksEnabled,
    } = user;

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "", md: "center" }}
            alignItems={{ xs: "start", md: "center" }}
            width={1}
            gap={{ xs: 3, md: 5, lg: 10 }}
            p={2}
        >
            <ToggleNotifications
                userId={id}
                notificationsEnabled={notificationsEnabled}
            />
            <TaskView userId={id} value={tasksEnabled} />
            <ToggleAgreements userId={id} enabled={agreementsEnabled} />
            <ToggleMessages userId={id} enabled={messagingEnabled} />
        </Stack>
    );
};

export default SeparatePermissions;
