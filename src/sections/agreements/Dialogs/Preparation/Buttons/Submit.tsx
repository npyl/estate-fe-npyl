import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
    const { t } = useTranslation();

    const {
        watch,
        formState: { isValid, isSubmitting },
    } = useFormContext();

    const isDraft = watch("draft");
    const isDisabled = !isDraft && !isValid;

    return (
        <LoadingButton
            disabled={isDisabled}
            loading={isSubmitting}
            type="submit"
        >
            {t("Save")}
        </LoadingButton>
    );
};

export default SubmitButton;
