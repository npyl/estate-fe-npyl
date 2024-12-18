import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";

const CreateButton = () => {
    const { t } = useTranslation();
    const { formState } = useFormContext();
    const isSubmitting = formState.isSubmitting;
    return (
        <LoadingButton
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="outlined"
            type="submit"
        >
            {t("Create")}
        </LoadingButton>
    );
};

export default CreateButton;
