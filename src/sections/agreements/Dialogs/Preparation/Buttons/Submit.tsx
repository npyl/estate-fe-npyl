import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
    const { t } = useTranslation();

    const {
        watch,
        formState: { isDirty, isSubmitting },
    } = useFormContext();

    const isDraft = watch("draft");

    return (
        <LoadingButton
            disabled={!isDirty && !isDraft}
            loading={isSubmitting}
            type="submit"
        >
            {t("Save")}
        </LoadingButton>
    );
};

export default SubmitButton;
