import Dialog from "@mui/material/Dialog";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAddColumnMutation } from "@/services/tickets";

interface Props {
    onClose: () => void;
}

const AddColumnDialog = ({ onClose }: Props) => {
    const { t } = useTranslation();

    const [name, setName] = useState("");

    const [addColumn] = useAddColumnMutation();

    const handleAdd = useCallback(() => {
        addColumn({ name });
        onClose();
    }, [name]);

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle
                sx={{
                    position: "relative",
                    p: 2,
                }}
            >
                {t("Add Task")}

                <IconButton
                    sx={{
                        position: "absolute",
                        top: 7,
                        right: 7,
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent
                sx={{
                    p: 2,
                }}
            >
                <TextField
                    placeholder={t("Name").toString()}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAdd}>{t("Add")}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddColumnDialog;
