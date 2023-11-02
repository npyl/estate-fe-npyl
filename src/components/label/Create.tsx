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
import { properties, useGetPropertyByIdQuery } from "src/services/properties";
import { customers, useGetCustomerByIdQuery } from "src/services/customers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface ILabelCreateProps {
    variant: LabelResourceType;
    resourceId: number;
}

// TODO: this needs to be debounced? (make sure we don't allow to click an already added label)

const LabelCreate = ({ variant, resourceId }: ILabelCreateProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const router = useRouter();
    const { propertyId } = router.query;

    const [dialogOpen, setDialogOpen] = useState(false);

    //
    //  Queries
    //
    const { data: property } = useGetPropertyByIdQuery(resourceId, {
        skip: variant !== "property",
    });
    const { data: document } = useGetPropertyByIdQuery(+propertyId!, {
        skip: variant !== "document",
        selectFromResult: ({ data }) => ({
            data: data?.documents?.find((d) => d.id === resourceId),
        }),
    });
    const { data: customer } = useGetCustomerByIdQuery(resourceId, {
        skip: variant !== "customer",
    });

    const { data: labels } = useGetLabelsQuery();

    //
    //  Mutations
    //
    const [createAssignLabel] = useCreateLabelForResourceMutation();
    const [assignLabel] = useAssignLabelToResourceMutation();
    const [deleteLabel] = useDeleteLabelForResourceMutation();

    const existingLabels = useMemo(() => {
        if (variant === "property") return labels?.propertyLabels || [];
        if (variant === "customer") return labels?.customerLabels || [];
        if (variant === "document") return labels?.documentLabels || [];

        return [];
    }, [labels, variant]);

    const assignedLabels = useMemo(() => {
        if (variant === "property") return property?.labels || [];
        if (variant === "customer") return customer?.labels || [];
        if (variant === "document") return document?.labels || [];

        return [];
    }, [variant, property, document, customer]);

    //
    //  Callbacks
    //
    const handleRemoveLabel = (i: number) =>
        deleteLabel({
            resource: variant,
            resourceId,
            labelId: assignedLabels[i].id,
        }).then(invalidateTags);

    const handleLabelClick = ({ id }: ILabelPOST) =>
        id &&
        assignLabel({
            resource: variant,
            resourceId,
            labelId: id,
        }).then(invalidateTags);

    const handleLabelCreate = (body: ILabelPOST) =>
        createAssignLabel({
            resource: variant,
            resourceId,
            body,
        }).then(invalidateTags);

    const invalidateTags = useCallback(() => {
        if (variant === "property" || variant === "document")
            dispatch(properties.util.invalidateTags(["PropertyById"]));
        else if (variant === "customer")
            dispatch(customers.util.invalidateTags(["CustomerById"]));
    }, [variant]);

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
                <IconButton size="small" onClick={handleOpenDialog}>
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
