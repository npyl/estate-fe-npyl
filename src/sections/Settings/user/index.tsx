import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    FormGroup,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import React, { FC, MouseEvent, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import AnimatedTableRow from "@/sections/Settings/user/AnimatedTableRow";
const UserForm = dynamic(() => import("@/sections/User/Form"));
import IOSSwitch from "@/components/iOSSwitch";
import { Label } from "@/components/Label";
import {
    useAllUsersQuery,
    useDeleteUserMutation,
    useToggleActiveUserMutation,
} from "@/services/user";
import dynamic from "next/dynamic";
import GotoPermissions from "./GotoPermissions";
import useDialog from "@/hooks/useDialog";
import { IUser } from "@/types/user";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@/components/confirm-dialog";

const CreateButton = () => {
    const { t } = useTranslation();

    const [isOpen, open, close] = useDialog();

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                style={{ marginBottom: "20px" }}
                onClick={open}
            >
                {t("Create User")}
            </Button>

            {isOpen ? <UserForm onClose={close} /> : null}
        </>
    );
};

interface EditButtonProps {
    user: IUser;
}

const EditButton: FC<EditButtonProps> = ({ user }) => {
    const [isOpen, open, close] = useDialog();

    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);

    return (
        <>
            <IconButton size="small" onClick={onClick}>
                <EditIcon fontSize="small" />
            </IconButton>

            {isOpen ? <UserForm user={user} onClose={close} /> : null}
        </>
    );
};

const getIsChecked = (activeStatuses: boolean[], userId: number) => {
    try {
        return activeStatuses[userId] ?? false;
    } catch (ex) {
        return false;
    }
};

interface ToggleActiveButtonProps {
    activeStatuses: boolean[];
    userId: number;
}

const ToggleActiveButton: FC<ToggleActiveButtonProps> = ({
    activeStatuses,
    userId,
}) => {
    const { t } = useTranslation();

    const isChecked = getIsChecked(activeStatuses, userId);

    const [toggleActiveUser] = useToggleActiveUserMutation();

    const toggle = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            toggleActiveUser(userId);
        },
        [userId]
    );

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <IOSSwitch
                        checked={isChecked} // fallback to 'false' if the id is not yet in the state
                        onChange={toggle}
                        onClick={(e) => e.stopPropagation()}
                        name="isActiveSwitch"
                        sx={{ m: 1 }}
                    />
                }
                label={t("Active")}
            />
        </FormGroup>
    );
};

interface DeleteButtonProps {
    userId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ userId }) => {
    const { t } = useTranslation();
    const [isOpen, open, close] = useDialog();
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);
    const [deleteUser] = useDeleteUserMutation();

    // TODO: transfer?!
    const onDelete = useCallback(
        () => deleteUser({ userId, transferId: -1 }),
        [userId]
    );
    return (
        <>
            <IconButton onClick={onClick}>
                <DeleteIcon />
            </IconButton>

            {isOpen ? (
                <ConfirmDialog
                    open
                    title={t("DELETE_USER_0")}
                    action={
                        <Button
                            disabled
                            color="error"
                            variant="contained"
                            onClick={onDelete}
                        >
                            {t("Delete")}
                        </Button>
                    }
                    onClose={close}
                />
            ) : null}
        </>
    );
};

interface UserRowProps {
    activeStatuses: boolean[];
    user: IUser;
}

const UserRow: FC<UserRowProps> = ({ user, activeStatuses }) => {
    const { t } = useTranslation();

    const router = useRouter();

    const handleRowClick = (userId: number) => {
        router.push(`/user/${userId}`);
    };

    return (
        <AnimatedTableRow key={user.id} onClick={() => handleRowClick(user.id)}>
            <TableCell>
                {user.firstName || ""} {user.lastName || ""}
            </TableCell>
            <TableCell>{user.email}</TableCell>
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

            <TableCell>{user.mobilePhone}</TableCell>
            <TableCell>
                <EditButton user={user} />
                <DeleteButton userId={user.id} />
            </TableCell>
            <TableCell>
                <GotoPermissions userId={user.id} />
            </TableCell>
        </AnimatedTableRow>
    );
};

const getRow = (activeStatuses: boolean[]) => (u: IUser) => (
    <UserRow key={u.id} user={u} activeStatuses={activeStatuses} />
);

const UserPage = () => {
    const { t } = useTranslation();

    const { data: users } = useAllUsersQuery();

    const activeStatuses = useMemo(
        () => users?.map(({ isActive }) => isActive) ?? [],
        [users]
    );

    return (
        <div>
            <CreateButton />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>{t("Fullname")}</TableCell>
                            <TableCell>{t("Email")}</TableCell>
                            <TableCell>{t("Status")}</TableCell>
                            <TableCell>{t("Mobile Phone")}</TableCell>
                            <TableCell>{t("Edit")}</TableCell>
                            <TableCell>{t("Permissions")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{users?.map(getRow(activeStatuses))}</TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default UserPage;
