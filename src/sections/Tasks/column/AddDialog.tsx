import Dialog from "@mui/material/Dialog";

import {
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
} from "@mui/material";
import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAddColumnMutation, useEditColumnMutation } from "@/services/tasks";
import { LoadingButton } from "@mui/lab";

interface Props {
    columnId?: number;
    onClose: () => void;
}

const AddOrEditDialog = ({ columnId, onClose }: Props) => {
    const { t } = useTranslation();

    const [name, setName] = useState("");

    const [addColumn] = useAddColumnMutation();
    const [editColumn] = useEditColumnMutation();

    const [isPending, startTransition] = useTransition();

    const title = columnId ? t("Edit column") : t("Add column");

    const handleSubmit = async () => {
        if (!name) return;

        const action = columnId ? editColumn : addColumn;
        const body = columnId ? { id: columnId!, name } : { name };

        startTransition(() => {
            action(body);
        });

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
                {title}

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
                <LoadingButton
                    loading={isPending}
                    disabled={isPending}
                    onClick={handleSubmit}
                >
                    {columnId ? t("Edit") : t("Add")}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default AddOrEditDialog;
