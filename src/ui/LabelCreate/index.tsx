import { StackProps } from "@mui/material";
import { ILabelPOST, LabelResourceType } from "src/types/label";
import {
    useAssignLabelToResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} from "src/services/labels";
import LabelSection from "@/ui/LabelSection";
import useAssignedLabels from "./useAssignedLabels";
import useInvalidateTags from "@/ui/LabelForm/useInvalidateTags";

interface ILabelCreateProps extends StackProps {
    variant: LabelResourceType;
    resourceId: number; // > 0 valid, -1 invalid
    disabled?: boolean;
}

const LabelCreate = ({
    variant,
    resourceId,
    disabled = false,
    ...props
}: ILabelCreateProps) => {
    const assignedLabels = useAssignedLabels(variant, resourceId);

    //
    //  Mutations
    //
    const [assignLabel, { isLoading: isAssignLoading }] =
        useAssignLabelToResourceIdMutation();
    const [deleteLabel, { isLoading: isDeleteLoading }] =
        useDeleteLabelForResourceIdMutation();

    const isLoading = isAssignLoading || isDeleteLoading;

    //
    //  Callbacks
    //
    const { invalidateTags } = useInvalidateTags(variant);

    const handleRemoveLabel = (labelId: number) =>
        deleteLabel({
            resource: variant,
            resourceId,
            labelId,
        }).then(invalidateTags);

    const handleLabelClick = (body: ILabelPOST) =>
        assignLabel({
            resource: variant,
            resourceId,
            body,
        }).then(invalidateTags);

    return (
        <LabelSection
            assignedLabels={assignedLabels}
            resourceId={resourceId}
            variant={variant}
            loading={isLoading}
            onLabelClick={handleLabelClick}
            onLabelRemove={handleRemoveLabel}
            {...props}
        />
    );
};

export default LabelCreate;
