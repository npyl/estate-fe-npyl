import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { FC } from "react";
import { ILabelForm } from "./types";
import useSubmit from "./useSubmit";

interface CreateButtonProps {
    resourceId?: number;
    edit: boolean;
    onSuccess?: (id: number) => void;
}

const CreateButton: FC<CreateButtonProps> = ({
    resourceId,
    edit,
    onSuccess,
}) => {
    const { t } = useTranslation();

    const { formState, handleSubmit } = useFormContext<ILabelForm>();
    const isSubmitting = formState.isSubmitting;
    const isDirty = formState.isDirty;

    const title = edit ? t("Update") : t("Create");

    const onSubmit = useSubmit(resourceId, onSuccess);

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
