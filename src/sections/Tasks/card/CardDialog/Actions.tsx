import Button from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ActionsProps {
    onClose: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <>
            <Button onClick={onClose}>{t("Close")}</Button>
        </>
    );
};

export default Actions;
