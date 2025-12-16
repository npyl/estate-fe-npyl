import EditIcon from "@mui/icons-material/Edit";
import { FC, useCallback } from "react";
import useDialog from "@/hooks/useDialog";
import RoundIconButton from "@/components/RoundIconButton";
import CreateOrEdit from "@/sections/Settings/Roles/CreateOrEdit";
import { SxProps, Theme } from "@mui/material";

const SolidBgSx: SxProps<Theme> = {
    bgcolor: "background.paper",
    ":hover": {
        bgcolor: "background.paper",
    },
};

interface EditButtonProps {
    roleId: number;
    onClose: VoidFunction;
}

const EditButton: FC<EditButtonProps> = ({ roleId, onClose: _onClose }) => {
    const [isOpen, open, close] = useDialog();
    const onClose = useCallback(() => {
        close();
        _onClose();
    }, [_onClose]);

    return (
        <>
            <RoundIconButton onClick={open} sx={SolidBgSx}>
                <EditIcon fontSize="small" />
            </RoundIconButton>

            {isOpen ? (
                <CreateOrEdit
                    roleId={roleId}
                    onCancel={onClose}
                    onClose={onClose}
                />
            ) : null}
        </>
    );
};

export default EditButton;
