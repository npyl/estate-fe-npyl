import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import { HideText } from "@/components/styled";

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
            onClick={onClick}
        >
            <SaveAsOutlinedIcon />
        </LoadingButton>
    );
};

export default SubmitWithoutRedirectButton;
