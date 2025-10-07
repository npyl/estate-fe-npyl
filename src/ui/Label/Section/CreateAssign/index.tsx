import { Stack, StackProps, Typography } from "@mui/material";
import { ILabel, LabelResourceType } from "src/types/label";
import { useTranslation } from "react-i18next";
import { SpaceBetween } from "@/components/styled";
import { FC } from "react";
import stopPropagation from "@/utils/stopPropagation";
import AddButton from "./AddButton";
import RemovableLabels from "./RemovableLabels";
import { InvalidateTagsMetadata } from "@/services/labels/types";

const LabelSectionTitleClassName = "PPLabelSectionTitle";

interface CreateAssignProps extends Omit<StackProps, "onClick"> {
    assignedLabels: ILabel[];
    variant: LabelResourceType;
    resourceId?: number; // > 0 valid, undefined invalid
    disabled?: boolean;

    meta?: InvalidateTagsMetadata;
}

const CreateAssign: FC<CreateAssignProps> = ({
    assignedLabels,

    variant,
    resourceId,
    disabled = false,

    meta = {},

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
                    disabled={disabled}
                    meta={meta}
                />
            </SpaceBetween>

            <Stack mt={2} />

            <RemovableLabels
                assignedLabels={assignedLabels}
                resource={variant}
                resourceId={resourceId}
                disabled={disabled}
                meta={meta}
            />
        </Stack>
    );
};

export { LabelSectionTitleClassName };
export type { CreateAssignProps };
export default CreateAssign;
