import { IUser } from "@/types/user";
import { TableCell, TableRow } from "@mui/material";
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
        <TableRow>
            <TableCell>
                <ToggleNotifications
                    userId={id}
                    notificationsEnabled={notificationsEnabled}
                />
            </TableCell>
            <TableCell>
                <TaskView userId={id} value={tasksEnabled} />
            </TableCell>
            <TableCell>
                <ToggleAgreements userId={id} enabled={agreementsEnabled} />
            </TableCell>
            <TableCell>
                <ToggleMessages userId={id} enabled={messagingEnabled} />
            </TableCell>
        </TableRow>
    );
};

export default SeparatePermissions;
