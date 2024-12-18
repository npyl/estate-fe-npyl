import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

const SubmitButton = () => {
    const { t } = useTranslation();
    const { formState } = useFormContext();
    const isSubmitting = formState.isSubmitting;
    return (
        <LoadingButton
            disabled={isSubmitting}
            loading={isSubmitting}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
        >
            {t("Create")}
        </LoadingButton>
    );
};

export default SubmitButton;
