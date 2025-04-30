import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

interface SubmitWithoutRedirectButtonProps {
    onClick: () => void;
}

const SubmitWithoutRedirectButton = ({
    onClick,
}: SubmitWithoutRedirectButtonProps) => {
    const { t } = useTranslation();
    const { formState } = useFormContext();
    const isSubmitting = formState.isSubmitting;

    return (
        <LoadingButton
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="contained"
            startIcon={<SaveAsOutlinedIcon />}
            onClick={onClick} //submit without redirect
        >
            {t("Save Without Redirect")}
        </LoadingButton>
    );
};

export default SubmitWithoutRedirectButton;
