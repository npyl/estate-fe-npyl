import { FC } from "react";
import FormDialog, { FormDialogProps } from "../FormDialog";

interface CreateDialogProps extends Omit<FormDialogProps, "assign"> {}

const CreateDialog: FC<CreateDialogProps> = (props) => (
    <FormDialog assign {...props} />
);

export default CreateDialog;
