import { Box, BoxProps, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useMemo } from "react";
import Label from "@/components/Label/Label";
import { ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
const AddLabelDialog = dynamic(() => import("./Dialog"));
import {
    useAssignLabelToResourceIdMutation,
    useCreateAssignLabelForResourceIdMutation,
    useDeleteLabelForResourceIdMutation,
} from "src/services/labels";
import { properties } from "src/services/properties";
import { customers } from "src/services/customers";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import useDialog from "@/hooks/useDialog";
import useAssignedLabels from "./useAssignedLabels";
import useExistingLabels from "./useExistingLabels";

interface ILabelCreateProps extends BoxProps {
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

    //
    // Assigned & Existing
    //
    const assignedLabels = useAssignedLabels(variant, resourceId);
    const existingLabels = useExistingLabels(variant);

    //
    //  Mutations
    //
    const [createAssignLabel, { isLoading: isCreateLoading }] =
        useCreateAssignLabelForResourceIdMutation();
    const [assignLabel, { isLoading: isAssignLoading }] =
        useAssignLabelToResourceIdMutation();
    const [deleteLabel, { isLoading: isDeleteLoading }] =
        useDeleteLabelForResourceIdMutation();

    const isLoading = useMemo(
        () => isCreateLoading || isAssignLoading || isDeleteLoading,
        [isCreateLoading, isAssignLoading, isDeleteLoading]
    );

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
        <Box
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                height: "100%",
                px: 1.5,
                py: 1.5,
                display: "flex",
            }}
            flexDirection={"column"}
            {...props}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10px",
                }}
            >
                <Typography flex={1} sx={{ justifyContent: "center" }}>
                    {t("Labels")}
                </Typography>
                <IconButton
                    size="small"
                    onClick={handleOpenDialog}
                    disabled={disabled || isLoading}
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>

            <Box flex={1} justifyContent={"center"} flexWrap={"wrap"} pt={2}>
                <Stack direction="row" flexWrap="wrap" gap={1}>
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
            </Box>

            {isOpen ? (
                <AddLabelDialog
                    variant={variant}
                    existingLabels={existingLabels}
                    assignedLabels={assignedLabels}
                    onLabelClick={handleLabelClick}
                    onCreate={invalidateTags}
                    onClose={closeDialog}
                />
            ) : null}
        </Box>
    );
};
export default LabelCreate;
