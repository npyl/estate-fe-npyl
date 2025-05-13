import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SendButton: FC<LoadingButtonProps> = ({ ...props }) => {
    const { t } = useTranslation();

    const { formState } = useFormContext();
    const isLoading = formState.isLoading;

    return (
        <LoadingButton
            type="submit"
            loading={isLoading}
            variant="contained"
            {...props}
        >
            {t("Send")}
        </LoadingButton>
    );
};

export default SendButton;
