import { Delete as DeleteIcon } from "@mui/icons-material";
import { FC, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
import RoundIconButton from "@/components/RoundIconButton";
import { SxProps, Theme } from "@mui/material";
const DeleteDialog = dynamic(() => import("./DeleteDialog"));

const SolidBgSx: SxProps<Theme> = {
    bgcolor: "background.paper",
    ":hover": {
        bgcolor: "background.paper",
    },
};

interface DeleteButtonProps {
    roleId: number;
    onClose: VoidFunction;
}

const DeleteButton: FC<DeleteButtonProps> = ({ roleId, onClose: _onClose }) => {
    const [isDeleteOpen, openDelete, closeDelete] = useDialog();
    const onClose = useCallback(() => {
        closeDelete();
        _onClose();
    }, [_onClose]);

    return (
        <>
            <RoundIconButton color="error" onClick={openDelete} sx={SolidBgSx}>
                <DeleteIcon fontSize="small" />
            </RoundIconButton>

            {isDeleteOpen ? (
                <DeleteDialog roleId={roleId} onClose={onClose} />
            ) : null}
        </>
    );
};

export default DeleteButton;
