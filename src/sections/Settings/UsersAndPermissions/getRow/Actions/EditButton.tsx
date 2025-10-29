import EditIcon from "@mui/icons-material/Edit";
import { FC, MouseEvent, useCallback } from "react";
const UserForm = dynamic(() => import("@/sections/User/Form"));
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import { IUser } from "@/types/user";
import RoundIconButton from "@/components/RoundIconButton";

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
            <RoundIconButton size="small" onClick={onClick}>
                <EditIcon fontSize="small" />
            </RoundIconButton>

            {isOpen ? <UserForm user={user} onClose={close} /> : null}
        </>
    );
};

export default EditButton;
