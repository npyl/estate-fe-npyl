import Dialog from "@mui/material/Dialog";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAddColumnMutation } from "@/services/tasks";

interface Props {
    onClose: () => void;
}

const AddColumnDialog = ({ onClose }: Props) => {
    const { t } = useTranslation();

    const [name, setName] = useState("");

    const [addColumn] = useAddColumnMutation();

    const handleAdd = () => {
        addColumn({ name });
        onClose();
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle
                sx={{
                    position: "relative",
                    p: 2,
                }}
            >
                {t("Add column")}

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
                    placeholder={t<string>("Name")}
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
