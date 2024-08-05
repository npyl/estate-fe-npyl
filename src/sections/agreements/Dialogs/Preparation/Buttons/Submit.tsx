import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
    const { t } = useTranslation();

    const {
        formState: { isSubmitting },
    } = useFormContext();

    return (
        <LoadingButton loading={isSubmitting} type="submit">
            {t("Save")}
        </LoadingButton>
    );
};

export default SubmitButton;
