import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IUser, IUserPOST } from "@/types/user";
import { MouseEvent, FC, useCallback } from "react";
import { useAddUserMutation } from "@/services/user";
import { useFormContext } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

interface SubmitButtonProps {
    user?: IUser;
    onClose: VoidFunction;
}

const SubmitButton: FC<SubmitButtonProps> = ({ user, onClose }) => {
    const { t } = useTranslation();

    const [addUser, { isLoading }] = useAddUserMutation();

    const onSubmit = useCallback(async ({ status: _, ...user }: IUserPOST) => {
        await addUser(user);
        onClose();
    }, []);

    const methods = useFormContext<IUserPOST>();
    const handleSubmit = useCallback(methods.handleSubmit(onSubmit), []);

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
        >
            <Typography>{user ? t("Update") : t("Create")}</Typography>
        </LoadingButton>
    );
};

export default SubmitButton;
