import IconButton from "@mui/material/IconButton";
import { MouseEvent, FC, useCallback } from "react";
import KeyIcon from "@mui/icons-material/Key";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const ResetDialog = dynamic(() => import("./Dialog"));

interface Props {
    userId: number;
}

const ResetPasswordButton: FC<Props> = ({ userId }) => {
    const [isOpen, open, close] = useDialog();
    const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        open();
    }, []);
    return (
        <>
            <IconButton size="small" onClick={onClick}>
                <KeyIcon fontSize="small" />
            </IconButton>

            {isOpen ? <ResetDialog userId={userId} onClose={close} /> : null}
        </>
    );
};

export default ResetPasswordButton;
