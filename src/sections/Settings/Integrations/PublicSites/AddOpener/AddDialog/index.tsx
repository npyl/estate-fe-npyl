import { FC } from "react";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Form from "./Form";
import SubmitButton from "./SubmitButton";
import { RHFTextField } from "@/components/hook-form";
import Dialog from "@/components/Dialog";
import { DialogContent, DialogContentProps } from "@mui/material";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 1, ...sx }}
        {...props}
    />
);

interface AddDialogProps {
    onClose: VoidFunction;
}

const AddDialog: FC<AddDialogProps> = ({ onClose }) => {
    const { t } = useTranslation();
    return (
        <Dialog
            submit
            hideTitle
            onClose={onClose}
            DialogContentComponent={StyledContent}
            content={
                <Form>
                    <Typography variant="h6" p={1}>
                        {t("Add public site")}
                    </Typography>
                    <RHFTextField name="siteUrl" label={t("Url")} />
                    <SubmitButton onClose={onClose} />
                </Form>
            }
        />
    );
};

export default AddDialog;
