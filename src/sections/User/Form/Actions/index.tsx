import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IUser } from "@/types/user";
import { FC } from "react";
import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";

interface ActionsProps {
    user?: IUser;
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ user, onClose }) => {
    const { t } = useTranslation();

    return (
        <>
            {user ? <ResetButton /> : null}
            <SubmitButton user={user} onClose={onClose} />
            <Button variant="outlined" onClick={onClose} color="secondary">
                <Typography>{t("Cancel")}</Typography>
            </Button>
        </>
    );
};

export default Actions;
