import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";
import { FC } from "react";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";
import { useFormContext } from "react-hook-form";

interface ActionsProps {
    user?: IUser;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ user, onClose }) => {
    const { t } = useTranslation();

    const { formState } = useFormContext();
    const { isDirty } = formState;

    return (
        <>
            {user ? <ResetButton /> : null}
            {isDirty ? <SubmitButton user={user} onClose={onClose} /> : null}
            <Button variant="outlined" onClick={onClose} color="secondary">
                <Typography>{t("Cancel")}</Typography>
            </Button>
        </>
    );
};

export default Actions;
