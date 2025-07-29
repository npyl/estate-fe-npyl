import { TableCell } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import AnimatedTableRow from "@/sections/Settings/user/AnimatedTableRow";
import { Label } from "@/components/Label";
import GotoPermissions from "./GotoPermissions";
import { IUser } from "@/types/user";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import ToggleActiveButton from "./ToggleActiveButton";
import AvatarLarge from "@/components/Avatar/Large";
import ResetPasswordButton from "./ResetPasswordButton";

interface UserRowProps {
    activeStatuses: boolean[];
    user: IUser;
}

const UserRow: FC<UserRowProps> = ({ user, activeStatuses }) => {
    const { t } = useTranslation();

    const { avatar, firstName, lastName, email } = user;

    const router = useRouter();

    const handleRowClick = (userId: number) => {
        router.push(`/user/${userId}`);
    };

    return (
        <AnimatedTableRow key={user.id} onClick={() => handleRowClick(user.id)}>
            <TableCell>
                <AvatarLarge
                    src={avatar}
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                />
            </TableCell>
            <TableCell>{user.mobilePhone}</TableCell>
            <TableCell>
                {user.isAdmin ? (
                    <Label
                        opaque
                        color="info"
                        name={t("Admin")}
                        width="fit-content"
                    />
                ) : (
                    <ToggleActiveButton
                        activeStatuses={activeStatuses}
                        userId={user.id}
                    />
                )}
            </TableCell>
            <TableCell>
                <GotoPermissions userId={user.id} />
            </TableCell>
            <TableCell>
                <ResetPasswordButton userId={user.id} />
                <EditButton user={user} />
                <DeleteButton userId={user.id} />
            </TableCell>
        </AnimatedTableRow>
    );
};

const getRow = (activeStatuses: boolean[]) => (u: IUser) => (
    <UserRow key={u.id} user={u} activeStatuses={activeStatuses} />
);

export default getRow;
