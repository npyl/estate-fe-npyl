import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import {
    useCreateAssignLabelForResourceIdMutation,
    useCreateLabelForResourceMutation,
} from "@/services/labels";
import { FC, useCallback } from "react";
import { ILabelForm } from "@/sections/Label/Create/types";
import { LabelResourceType } from "@/types/label";
import useInvalidateTags from "./useInvalidateTags";

interface CreateButtonProps {
    edit: boolean;
    resourceId?: number;
    resource: LabelResourceType;
    onCreate?: (id: number) => void;
}

const CreateButton: FC<CreateButtonProps> = ({
    edit,
    resource,
    resourceId,
    onCreate,
}) => {
    const { t } = useTranslation();

    const { formState, handleSubmit } = useFormContext<ILabelForm>();
    const isSubmitting = formState.isSubmitting;
    const isDirty = formState.isDirty;

    const isAssign = Boolean(resourceId);
    const title = edit ? t("Update") : t("Create");

    const { invalidateTags } = useInvalidateTags(resource);

    const [createLabel] = useCreateLabelForResourceMutation();
    const [createAssignLabel] = useCreateAssignLabelForResourceIdMutation();

    const onSubmit = useCallback(
        async ({ resource: _0, resourceId: _, ...body }: ILabelForm) => {
            const cb = isAssign ? createAssignLabel : createLabel;

            const res = await cb({ body, resource, resourceId: resourceId! });

            if (res && "error" in res) return;

            invalidateTags();

            onCreate?.(res.data?.id);
        },
        [isAssign, onCreate]
    );

    return (
        <LoadingButton
            loading={isSubmitting}
            disabled={!isDirty || isSubmitting}
            variant="contained"
            onClick={handleSubmit(onSubmit)}
        >
            {title}
        </LoadingButton>
    );
};

export default CreateButton;
