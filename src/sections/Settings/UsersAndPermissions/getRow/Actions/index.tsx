import Stack from "@mui/material/Stack";
import ResetPasswordButton from "./ResetPasswordButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { FC } from "react";
import { IUser } from "@/types/user";

interface ActionsProps {
    user: IUser;
    activeStatuses: boolean[];
}

const Actions: FC<ActionsProps> = ({ user, activeStatuses }) => (
    <Stack direction="row" spacing={1}>
        <ResetPasswordButton userId={user.id} />
        <EditButton user={user} />
        <DeleteButton userId={user.id} />
    </Stack>
);

export default Actions;
