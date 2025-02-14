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
import { MouseEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import {
    useAllUsersQuery,
    useToggleActiveNotificationMutation,
} from "@/services/user";
import { IOSSwitch } from "@/components/iOSSwitch";
import Avatar from "@/components/Avatar";
import AdminLabel from "@/sections/User/AdminLabel";

interface ToggleNotificationsProps {
    userId: number;
    notificationsEnabled: boolean;
}

const ToggleNotifications: FC<ToggleNotificationsProps> = ({
    userId,
    notificationsEnabled,
}) => {
    const [toggleActiveNotification] = useToggleActiveNotificationMutation();

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleActiveNotification(userId);
    };

    return <IOSSwitch checked={notificationsEnabled} onClick={handleClick} />;
};

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
                {isAdmin ? <AdminLabel /> : null}
                {!isAdmin ? (
                    <ToggleNotifications
                        userId={id}
                        notificationsEnabled={notificationsEnabled}
                    />
                ) : null}
            </TableCell>
        </TableRow>
    );
};

const getRow = (user: IUser) => <Row key={user.id} user={user} />;

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
