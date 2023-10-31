import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo, useState } from "react";
import Label from "src/components/label/Label";
import { LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import { AddLabelDialog } from "./components/Dialog";
import {
    useDeleteLabelForResourceMutation,
    useGetLabelsQuery,
} from "src/services/labels";
import { useGetPropertyByIdQuery } from "src/services/properties";
import { useGetCustomerByIdQuery } from "src/services/customers";
import { useRouter } from "next/router";

interface ILabelCreateProps {
    variant: LabelResourceType;
    resourceId: number;
}

const LabelCreate = ({ variant, resourceId }: ILabelCreateProps) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

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

    //
    //  Mutations
    //
    const [deleteLabel] = useDeleteLabelForResourceMutation();

    const { data: labels } = useGetLabelsQuery();

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
    }, [variant, property, customer]);

    const handleRemoveLabel = (i: number) =>
        deleteLabel({
            resource: variant,
            resourceId,
            labelId: assignedLabels[i].id,
        });

    // TODO: this needs to be debounced? (make sure we don't allow to click an already added label)
    const handleLabelClick = () => {};
    const handleLabelCreate = () => {};

    const [addLabelDialog, setAddLabelDialog] = useState(false);

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
                    onClick={() => setAddLabelDialog(true)}
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
                            onClose={() => handleRemoveLabel(index)}
                        >
                            {name}
                        </Label>
                    ))}
                </Stack>
            </Box>

            {addLabelDialog && (
                <AddLabelDialog
                    open={addLabelDialog}
                    variant={variant}
                    existingLabels={existingLabels}
                    assignedLabels={assignedLabels}
                    onLabelClick={handleLabelClick}
                    onCreate={handleLabelCreate}
                    onClose={() => setAddLabelDialog(false)}
                />
            )}
        </Box>
    );
};
export default LabelCreate;
