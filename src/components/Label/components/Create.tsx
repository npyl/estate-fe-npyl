import { Box, BoxProps, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useMemo, useState } from "react";
import Label from "@/components/Label/Label";
import { ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import { AddLabelDialog } from "./Dialog";
import {
    useAssignLabelToResourceMutation,
    useCreateLabelForResourceMutation,
    useDeleteLabelForResourceMutation,
    useGetLabelsQuery,
} from "src/services/labels";
import {
    useGetPropertyLabelsQuery,
    useGetPropertyDocumentsQuery,
    properties,
} from "src/services/properties";
import { customers, useGetCustomerLabelsQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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

    const router = useRouter();
    const { propertyId } = router.query;

    const [dialogOpen, setDialogOpen] = useState(false);

    //
    //  Queries
    //
    const { data: propertyLabels } = useGetPropertyLabelsQuery(resourceId!, {
        skip: variant !== "property" || resourceId === -1,
    });
    const { data: documentLabels } = useGetPropertyDocumentsQuery(
        +propertyId!,
        {
            skip: variant !== "document",
            selectFromResult: ({ data }) => ({
                data: data?.find((d) => d.id === resourceId)?.labels,
            }),
        }
    );
    const { data: customerLabels } = useGetCustomerLabelsQuery(resourceId!, {
        skip: variant !== "customer" || resourceId === -1,
    });

    const { data: labels } = useGetLabelsQuery();

    //
    //  Mutations
    //
    const [createAssignLabel, { isLoading: isCreateLoading }] =
        useCreateLabelForResourceMutation();
    const [assignLabel, { isLoading: isAssignLoading }] =
        useAssignLabelToResourceMutation();
    const [deleteLabel, { isLoading: isDeleteLoading }] =
        useDeleteLabelForResourceMutation();

    const existingLabels = useMemo(() => {
        if (variant === "property") return labels?.propertyLabels || [];
        if (variant === "customer") return labels?.customerLabels || [];
        if (variant === "document") return labels?.documentLabels || [];

        return [];
    }, [labels, variant]);

    const assignedLabels = useMemo(() => {
        if (variant === "property") return propertyLabels || [];
        if (variant === "customer") return customerLabels || [];
        if (variant === "document") return documentLabels || [];

        return [];
    }, [variant, propertyLabels, documentLabels, customerLabels]);

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

    const handleLabelCreate = (body: ILabelPOST) =>
        createAssignLabel({
            resource: variant,
            resourceId,
            body,
        }).then(invalidateTags);

    const handleOpenDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setDialogOpen(true);
    };
    const handleCloseDialog = () => setDialogOpen(false);

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
                    {assignedLabels?.map(({ id, color, name }, index) => (
                        <Label
                            key={index}
                            color={color}
                            name={name}
                            disabled={disabled || isLoading}
                            onClose={() => handleRemoveLabel(id)}
                        />
                    ))}
                </Stack>
            </Box>

            {dialogOpen && (
                <AddLabelDialog
                    open={dialogOpen}
                    variant={variant}
                    existingLabels={existingLabels}
                    assignedLabels={assignedLabels}
                    onLabelClick={handleLabelClick}
                    onCreate={handleLabelCreate}
                    onClose={handleCloseDialog}
                />
            )}
        </Box>
    );
};
export default LabelCreate;
