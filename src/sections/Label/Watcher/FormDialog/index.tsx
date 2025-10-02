import Dialog from "@/components/Dialog";
import Form from "@/ui/Label/Form";
import toNumberSafe from "@/utils/toNumberSafe";
import useIdParam, { CREATE_FLAG } from "../../useIdParam";
import { FC } from "react";
import { DialogContent, DialogContentProps } from "@mui/material";

const StyledContent: FC<DialogContentProps> = ({ sx, ...props }) => (
    <DialogContent sx={{ p: 0, ...sx }} {...props} />
);

interface FormDialogProps {
    id: string;
}

const FormDialog: FC<FormDialogProps> = ({ id }) => {
    const resourceId = id !== CREATE_FLAG ? toNumberSafe(id) : undefined;

    const { removeId } = useIdParam();

    return (
        <Dialog
            hideTitle
            DialogContentComponent={StyledContent}
            content={
                <Form
                    resource="customer"
                    resourceId={resourceId}
                    onCancel={removeId}
                />
            }
        />
    );
};

export default FormDialog;
