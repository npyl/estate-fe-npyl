import { Box, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useMemo, useState } from "react";
import Label from "src/components/label/Label";
import { ILabel, ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import { AddLabelDialog } from "./components/Dialog";
import { useGetLabelsQuery } from "src/services/labels";

interface ILabelCreateProps {
    variant?: LabelResourceType;

    // assigned-existing labels & newly-created labels
    assignedLabels: ILabel[];

    // handlers
    onLabelClick: (label: ILabel) => void;
    onLabelCreate: (label: ILabelPOST) => void;
    onRemoveAssignedLabel: (index: number) => void;
}

const LabelCreate = ({
    variant = "property",
    assignedLabels = [],
    onLabelClick,
    onLabelCreate,
    onRemoveAssignedLabel,
}: ILabelCreateProps) => {
    const { t } = useTranslation();

    const { data: labels } = useGetLabelsQuery();

    const existingLabels = useMemo(() => {
        if (variant === "property") return labels?.propertyLabels || [];
        if (variant === "customer") return labels?.customerLabels || [];
        if (variant === "document") return labels?.documentLabels || [];

        return [];
    }, [labels, variant]);

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
                            onClose={() => onRemoveAssignedLabel(index)}
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
                    onLabelClick={onLabelClick}
                    onCreate={onLabelCreate}
                    onClose={() => setAddLabelDialog(false)}
                />
            )}
        </Box>
    );
};
export default LabelCreate;
