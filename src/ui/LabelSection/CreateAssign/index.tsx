import { Stack, StackProps, Typography } from "@mui/material";
import { ILabel, ILabelPOST, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import { FC } from "react";
import stopPropagation from "@/utils/stopPropagation";
import AddButton from "./AddButton";
import Labels from "./Labels";

const LabelSectionTitleClassName = "PPLabelSectionTitle";

interface CreateAssignProps extends Omit<StackProps, "onClick"> {
    assignedLabels: ILabel[];

    variant: LabelResourceType;
    resourceId?: number; // > 0 valid, undefined invalid
    disabled?: boolean;
    loading?: boolean;

    onLabelClick: (l: ILabelPOST) => void;
    onLabelRemove: (id: number) => void;
}

const CreateAssign: FC<CreateAssignProps> = ({
    assignedLabels,

    variant,
    resourceId,
    disabled = false,
    loading = false,

    onLabelClick,
    onLabelRemove,

    ...props
}) => {
    const { t } = useTranslation();

    return (
        <Stack
            border="1px solid"
            borderColor="divider"
            borderRadius={1}
            height={1}
            py={1}
            onClick={stopPropagation}
            {...props}
        >
            <SpaceBetween alignItems="center" height={10}>
                <Typography className={LabelSectionTitleClassName} ml={1}>
                    {t("Labels")}
                </Typography>

                <AddButton
                    variant={variant}
                    resourceId={resourceId}
                    // ...
                    disabled={disabled}
                    loading={loading}
                    // ...
                    onLabelClick={onLabelClick}
                />
            </SpaceBetween>

            <Stack mt={2} />

            <Labels
                labels={assignedLabels}
                disabled={disabled || loading}
                onLabelRemove={onLabelRemove}
            />
        </Stack>
    );
};

export { LabelSectionTitleClassName };
export type { CreateAssignProps };
export default CreateAssign;
