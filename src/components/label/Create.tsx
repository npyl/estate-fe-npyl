import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useCallback, useMemo, useState } from "react";
import Label from "src/components/label/Label";
import { ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import { AddLabelDialog } from "./components/Dialog";
import {
    useAssignLabelToResourceMutation,
    useCreateLabelForResourceMutation,
    useDeleteLabelForResourceMutation,
    useGetLabelsQuery,
} from "src/services/labels";
import {
    useGetPropertyLabelsQuery,
    useGetPropertyDocumentsQuery,
} from "src/services/properties";
import { useGetCustomerLabelsQuery } from "src/services/customers";
import { useRouter } from "next/router";

interface ILabelCreateProps {
    variant: LabelResourceType;
    resourceId: number;
}

// TODO: this needs to be debounced? (make sure we don't allow to click an already added label)

const LabelCreate = ({ variant, resourceId }: ILabelCreateProps) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const [dialogOpen, setDialogOpen] = useState(false);

    //
    //  Queries
    //
    const { data: propertyLabels } = useGetPropertyLabelsQuery(resourceId, {
        skip: variant !== "property",
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
    const { data: customerLabels } = useGetCustomerLabelsQuery(resourceId, {
        skip: variant !== "customer",
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
    const handleRemoveLabel = (i: number) =>
        deleteLabel({
            resource: variant,
            resourceId,
            labelId: assignedLabels[i].id,
        });

    const handleLabelClick = (body: ILabelPOST) =>
        body.id &&
        assignLabel({
            resource: variant,
            resourceId,
            body,
        });

    const handleLabelCreate = (body: ILabelPOST) =>
        createAssignLabel({
            resource: variant,
            resourceId,
            body,
        });

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
                    disabled={isLoading}
                >
                    <AddCircleIcon />
                </IconButton>
            </Box>

            <Box flex={1} justifyContent={"center"} flexWrap={"wrap"} pt={2}>
                <Stack direction={"row"} flexWrap={"wrap"} spacing={1}>
                    {assignedLabels?.map(({ color, name }, index) => (
                        <Label
                            key={index}
                            variant="soft"
                            sx={{
                                bgcolor: color,
                                color: "white",
                            }}
                            disabled={isLoading}
                            onClose={() => handleRemoveLabel(index)}
                        >
                            {name}
                        </Label>
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
