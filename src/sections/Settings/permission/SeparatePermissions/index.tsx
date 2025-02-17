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
import Avatar from "@/components/Avatar";
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

const Row: FC<RowProps> = ({ user }) => {
    const { id, firstName, lastName, avatar, notificationsEnabled, isAdmin } =
        user;

    return (
        <TableRow>
            <TableCell>
                <Avatar
                    src={avatar}
                    firstName={firstName}
                    lastName={lastName}
                />
            </TableCell>
            <TableCell>
                <ToggleNotifications
                    userId={id}
                    notificationsEnabled={notificationsEnabled}
                />
            </TableCell>
            <TableCell>
                <TaskView userId={id} />
            </TableCell>
            <TableCell>
                <ToggleAgreements userId={id} enabled={notificationsEnabled} />
            </TableCell>
            <TableCell>
                <ToggleMessages userId={id} enabled={notificationsEnabled} />
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
