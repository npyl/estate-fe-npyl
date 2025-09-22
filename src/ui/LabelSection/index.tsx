import { ILabelPOST } from "@/types/label";
import {
    useAssignLabelToResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} from "@/services/labels";
import CreateAssign, { CreateAssignProps } from "./CreateAssign";
import useAssignedLabels from "./useAssignedLabels";
import useInvalidateTags from "@/ui/LabelForm/useInvalidateTags";
import { FC, useCallback } from "react";
import isFalsy from "@/utils/isFalsy";

interface ILabelCreateProps
    extends Omit<
        CreateAssignProps,
        "assignedLabels" | "onLabelCreate" | "onLabelClick" | "onLabelRemove"
    > {}

const LabelCreate: FC<ILabelCreateProps> = ({
    variant,
    resourceId,
    disabled = false,
    ...props
}) => {
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

    const handleRemoveLabel = useCallback(
        async (labelId: number) => {
            if (isFalsy(resourceId)) return;
            const res = await deleteLabel({
                resource: variant,
                resourceId: resourceId!,
                labelId,
            });
            if ("error" in res) return;
            invalidateTags();
        },
        [variant, resourceId, invalidateTags]
    );

    const handleLabelClick = useCallback(
        async (body: ILabelPOST) => {
            if (isFalsy(resourceId)) return;
            const res = await assignLabel({
                resource: variant,
                resourceId: resourceId!,
                body,
            });
            if ("error" in res) return;
            invalidateTags();
        },
        [variant, resourceId, invalidateTags]
    );

    return (
        <CreateAssign
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
