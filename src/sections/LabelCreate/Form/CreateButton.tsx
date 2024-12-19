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

interface CreateButtonProps {
    resourceId?: number;
    resource: LabelResourceType;
    onCreate?: (id: number) => void;
}

const CreateButton: FC<CreateButtonProps> = ({
    resource,
    resourceId,
    onCreate,
}) => {
    const { t } = useTranslation();
    const { formState, handleSubmit } = useFormContext<ILabelForm>();
    const isSubmitting = formState.isSubmitting;

    const isAssign = Boolean(resourceId);

    const [createLabel] = useCreateLabelForResourceMutation();
    const [createAssignLabel] = useCreateAssignLabelForResourceIdMutation();

    const onSubmit = useCallback(
        async ({ resource: _0, resourceId: _, ...body }: ILabelForm) => {
            const cb = isAssign ? createAssignLabel : createLabel;
            const bd = isAssign
                ? { body, resource, resourceId: resourceId! }
                : { body, resource };

            const res = await cb(bd);

            if (res && "error" in res) return;

            onCreate?.(res.data?.id);
        },
        [isAssign, onCreate]
    );

    return (
        <LoadingButton
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="outlined"
            onClick={handleSubmit(onSubmit)}
        >
            {t("Create")}
        </LoadingButton>
    );
};

export default CreateButton;
