import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

const SubmitButton = () => {
    const { t } = useTranslation();

    const { formState } = useFormContext();

    const isSubmitting = formState.isSubmitting;

    return (
        <LoadingButton
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="contained"
            startIcon={<SendIcon />}
            type="submit"
        >
            {t("Save")}
        </LoadingButton>
    );
};

export default SubmitButton;
