import { FC, MouseEvent, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import dynamic from "next/dynamic";
import RoundIconButton from "@/components/RoundIconButton";
const DeleteDialog = dynamic(() => import("./Dialog"));

interface DeleteButtonProps {
    userId: number;
}

const DeleteButton: FC<DeleteButtonProps> = ({ userId }) => {
    const [isOpen, open, close] = useDialog();
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);

    return (
        <>
            <RoundIconButton size="small" onClick={onClick}>
                <DeleteIcon fontSize="small" />
            </RoundIconButton>

            {isOpen ? <DeleteDialog userId={userId} onClose={close} /> : null}
        </>
    );
};

export default DeleteButton;
