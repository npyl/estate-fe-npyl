import { FormDialogProps } from "@/sections/Label/FormDialog";
import { FC } from "react";

interface EditButtonProps extends Omit<FormDialogProps, "label"> {
    roleId: number;
}

const EditDialog: FC<EditButtonProps> = ({ roleId, ...props }) => {
    return null;
};

export default EditDialog;
