import Stack from "@mui/material/Stack";
import ResetPasswordButton from "./ResetPasswordButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { FC } from "react";
import { IUser } from "@/types/user";

interface ActionsProps {
    user: IUser;
}

const Actions: FC<ActionsProps> = ({ user }) => (
    <Stack direction="row" spacing={1} alignItems="center">
        <ResetPasswordButton userId={user.id} />
        <EditButton user={user} />
        <DeleteButton userId={user.id} />
    </Stack>
);

export default Actions;
