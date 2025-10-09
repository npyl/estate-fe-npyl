import Dialog from "@/components/Dialog";
import {
    DialogContent,
    DialogContentProps,
    DialogTitle,
    DialogTitleProps,
    IconButton,
    TextField,
} from "@mui/material";
import { FC, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Close as CloseIcon } from "@mui/icons-material";
import { useAddColumnMutation, useEditColumnMutation } from "@/services/tasks";
import { LoadingButton } from "@mui/lab";

const StyledDialogTitle: FC<DialogTitleProps> = ({ sx, ...props }) => (
    <DialogTitle sx={{ position: "relative", p: 2, ...sx }} {...props} />
);

const StyledDialogContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 2, ...sx }} {...props} />
);

interface Props {
    columnId?: number;
    onClose: VoidFunction;
}

const AddOrEditDialog: FC<Props> = ({ columnId, onClose }) => {
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
        <Dialog
            DialogTitleComponent={StyledDialogTitle}
            DialogContentComponent={StyledDialogContent}
            onClose={onClose}
            // ...
            title={
                <>
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
                </>
            }
            content={
                <TextField
                    fullWidth
                    placeholder={t<string>("Name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            }
            actions={
                <LoadingButton
                    loading={isPending}
                    disabled={isPending}
                    onClick={handleSubmit}
                >
                    {columnId ? t("Edit") : t("Add")}
                </LoadingButton>
            }
        />
    );
};

export default AddOrEditDialog;
