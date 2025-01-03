import { StackProps } from "@mui/material";
import { useCallback } from "react";
import { ILabelPOST, LabelResourceType } from "src/types/label";
import {
    useAssignLabelToResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} from "src/services/labels";
import { properties } from "src/services/properties";
import { customers } from "src/services/customers";
import { useDispatch } from "react-redux";
import { tasks } from "@/services/tasks";
import LabelSection from "@/sections/LabelSection";
import useAssignedLabels from "./useAssignedLabels";

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
    const dispatch = useDispatch();

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
    const invalidateTags = useCallback(() => {
        if (variant === "property")
            dispatch(properties.util.invalidateTags(["PropertyByIdLabels"]));
        else if (variant === "document")
            dispatch(properties.util.invalidateTags(["PropertyByIdDocuments"]));
        else if (variant === "customer")
            dispatch(customers.util.invalidateTags(["CustomerByIdLabels"]));
        else if (variant === "ticket")
            dispatch(tasks.util.invalidateTags(["Labels"]));
    }, [variant]);

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
