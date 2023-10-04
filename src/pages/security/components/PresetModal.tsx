import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSave: (name: string) => void;
    presetName?: string;
};
export default function SavePresetDialog({
    open,
    setOpen,
    handleSave,
    presetName,
}: Props) {
    const [name, setName] = useState<string>(presetName ?? "");
    const handleClose = () => {
        setOpen(false);
    };
    const { t } = useTranslation();
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{t("New preset")}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    InputLabelProps={{
                        shrink: false,
                    }}
                    placeholder={t("Name") as string}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t("Cancel")}</Button>
                <Button onClick={() => handleSave(name)}>{t("Save")}</Button>
            </DialogActions>
        </Dialog>
    );
}
