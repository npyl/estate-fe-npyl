import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ICustomerYup } from "./types";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { FC } from "react";

interface SaveButtonProps {
    quickCreate: boolean;
    loading: boolean;
    error: boolean;
    onClick: VoidFunction;
}

const SaveButton: FC<SaveButtonProps> = ({
    quickCreate,
    loading,
    error,
    onClick,
}) => {
    const { t } = useTranslation();

    const { formState } = useFormContext<ICustomerYup>();
    const isDirty = formState.isDirty;

    const isDisabled = !isDirty && !quickCreate;
    const isLoading = loading && !error;

    return (
        <LoadingButton
            disabled={isDisabled}
            loading={isLoading}
            variant="contained"
            startIcon={<SendIcon />}
            onClick={onClick}
        >
            {t("Save")}
        </LoadingButton>
    );
};

export default SaveButton;
