import { IUser } from "@/types/user";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAllUsersQuery } from "@/services/user";
import {
    ToggleAgreements,
    ToggleMessages,
    ToggleNotifications,
} from "./Toggles";
import TaskView from "./TaskView";
import AvatarLarge from "@/components/Avatar/Large";

// -------------------------------------------------------------------------------------

interface RowProps {
    user: IUser;
}

const Row: FC<RowProps> = ({ user }) => {
    const {
        id,
        firstName,
        lastName,
        email,
        avatar,
        notificationsEnabled,
        agreementsEnabled,
        messagingEnabled,
        tasksEnabled,
    } = user;

    return (
        <TableRow>
            <TableCell>
                <AvatarLarge
                    src={avatar}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                />
            </TableCell>
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

// INFO: ignore admins
const getRow = (user: IUser) =>
    user.isAdmin ? null : <Row key={user.id} user={user} />;

const SeparatePermissions = () => {
    const { data: users } = useAllUsersQuery();
    const { t } = useTranslation();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t("Users")}</TableCell>
                        <TableCell>{t("Notifications")}</TableCell>
                        <TableCell>{t("Tasks")}</TableCell>
                        <TableCell>{t("Agreements")}</TableCell>
                        <TableCell>{t("Messages")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{users?.map(getRow)}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default SeparatePermissions;
