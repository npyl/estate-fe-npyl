import { IconButton, Stack, StackProps, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback } from "react";
import Label from "@/components/Label/Label";
import { ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
const AddLabelDialog = dynamic(() => import("./Dialog"));
import {
    useAssignLabelToResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} from "src/services/labels";
import { properties } from "src/services/properties";
import { customers } from "src/services/customers";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import useAssignedLabels from "./useAssignedLabels";
import { tasks } from "@/services/tasks";
import { SpaceBetween } from "@/components/styled";

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
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

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
        labelId &&
        deleteLabel({
            resource: variant,
            resourceId,
            labelId,
        }).then(invalidateTags);

    const handleLabelClick = (body: ILabelPOST) =>
        body.id &&
        assignLabel({
            resource: variant,
            resourceId,
            body,
        }).then(invalidateTags);

    const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openDialog();
    };

    return (
        <Stack
            border="1px solid"
            borderColor="divider"
            borderRadius={1}
            height={1}
            py={1}
            {...props}
        >
            <SpaceBetween alignItems="center" height="10px">
                <Typography ml={1}>{t("Labels")}</Typography>
                <IconButton
                    size="small"
                    onClick={handleOpenDialog}
                    disabled={disabled || isLoading}
                >
                    <AddCircleIcon />
                </IconButton>
            </SpaceBetween>

            <Stack direction="row" flexWrap="wrap" gap={1} pt={2} px={0.5}>
                {assignedLabels?.map(({ id, color, name }) => (
                    <Label
                        key={id}
                        color={color}
                        name={name}
                        disabled={disabled || isLoading}
                        onClose={() => handleRemoveLabel(id)}
                    />
                ))}
            </Stack>

            {isOpen ? (
                <AddLabelDialog
                    resourceId={resourceId}
                    variant={variant}
                    // ...
                    onLabelClick={handleLabelClick}
                    onCreate={invalidateTags}
                    onClose={closeDialog}
                />
            ) : null}
        </Stack>
    );
};
export default LabelCreate;
