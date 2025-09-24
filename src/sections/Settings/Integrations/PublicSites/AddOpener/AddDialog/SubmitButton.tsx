import { useAddPublicSiteMutation } from "@/services/company";
import { IPublicSiteReq } from "@/types/company";
import { LoadingButton } from "@mui/lab";
import { FC, MouseEvent, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SubmitButtonProps {
    onClose: VoidFunction;
}

const SubmitButton: FC<SubmitButtonProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const methods = useFormContext<IPublicSiteReq>();

    const [addPublic, { isLoading }] = useAddPublicSiteMutation();
    const onClick = useCallback(
        async (e: MouseEvent<HTMLButtonElement>) => {
            await methods.handleSubmit(addPublic)(e);
            onClose();
        },
        [onClose]
    );

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            onClick={onClick}
            sx={{
                width: "fit-content",
                alignSelf: "flex-end",
            }}
        >
            {t("Add")}
        </LoadingButton>
    );
};

export default SubmitButton;
