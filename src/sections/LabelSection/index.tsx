import { IconButton, Stack, StackProps, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Label from "@/components/Label/Label";
import { ILabel, ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import useDialog from "@/hooks/useDialog";
import { SpaceBetween } from "@/components/styled";
import dynamic from "next/dynamic";
import { FC, useCallback } from "react";
const AddLabelDialog = dynamic(() => import("./Dialog"));

interface LabelSectionProps extends StackProps {
    assignedLabels: ILabel[];

    variant: LabelResourceType;
    resourceId: number; // > 0 valid, -1 invalid
    disabled?: boolean;
    loading?: boolean;

    onLabelClick: (l: ILabelPOST) => void;
    onLabelCreate?: (id: number) => void;
    onLabelRemove: (id: number) => void;
}

const LabelSection: FC<LabelSectionProps> = ({
    assignedLabels,

    variant,
    resourceId,
    disabled = false,
    loading = false,

    onLabelClick,
    onLabelCreate,
    onLabelRemove,

    ...props
}) => {
    const { t } = useTranslation();

    const [isOpen, openDialog, closeDialog] = useDialog();

    const handleOpenDialog = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            openDialog();
        },
        []
    );

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
                    disabled={disabled || loading}
                >
                    <AddCircleIcon />
                </IconButton>
            </SpaceBetween>

            <Stack direction="row" flexWrap="wrap" gap={1} pt={2} px={0.5}>
                {assignedLabels.map(({ id, color, name }) => (
                    <Label
                        key={id}
                        color={color}
                        name={name}
                        disabled={disabled || loading}
                        onClose={() => onLabelRemove(id)}
                    />
                ))}
            </Stack>

            {isOpen ? (
                <AddLabelDialog
                    resourceId={resourceId}
                    variant={variant}
                    // ...
                    onLabelClick={onLabelClick}
                    onCreate={onLabelCreate}
                    onClose={closeDialog}
                />
            ) : null}
        </Stack>
    );
};

export default LabelSection;
