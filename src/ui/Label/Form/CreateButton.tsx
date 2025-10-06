import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import {
    useCreateAssignLabelForResourceIdMutation,
    useCreateLabelForResourceMutation,
} from "@/services/labels";
import { FC, useCallback } from "react";
import useInvalidateTags from "./useInvalidateTags";
import { ILabelForm } from "./types";
import isFalsy from "@/utils/isFalsy";

interface CreateButtonProps {
    edit: boolean;
    onSuccess?: (id: number) => void;
}

const CreateButton: FC<CreateButtonProps> = ({ edit, onSuccess }) => {
    const { t } = useTranslation();

    const { formState, handleSubmit } = useFormContext<ILabelForm>();
    const isSubmitting = formState.isSubmitting;
    const isDirty = formState.isDirty;

    const title = edit ? t("Update") : t("Create");

    const { invalidateTags } = useInvalidateTags();

    const [createLabel] = useCreateLabelForResourceMutation();
    const [createAssignLabel] = useCreateAssignLabelForResourceIdMutation();

    const onSubmit = useCallback(
        async ({ resource, resourceId, ...body }: ILabelForm) => {
            const cb = isFalsy(resourceId) ? createLabel : createAssignLabel;
            const data = isFalsy(resourceId)
                ? { body, resource }
                : { body, resource, resourceId: resourceId! };

            const res = await cb(data as any);

            if (res && "error" in res) return;

            invalidateTags(resource);

            onSuccess?.(res.data?.id);
        },
        [onSuccess]
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
