import FormDialog from "@/sections/Label/FormDialog";
import { useGetLabelForResourceQuery } from "@/services/labels";
import { LabelResourceType } from "@/types/label";
import { LabelFormProps } from "@/ui/Label/Form";
import { FC } from "react";

interface EditButtonProps extends Omit<LabelFormProps, "label"> {
    resource: LabelResourceType;
    labelId: number;
}

const EditDialog: FC<EditButtonProps> = ({ resource, labelId, ...props }) => {
    const { data } = useGetLabelForResourceQuery({ resource, labelId });
    if (!data) return null;
    return <FormDialog label={data} {...props} />;
};

export default EditDialog;
