import Button, { ButtonProps } from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const CancelButton: FC<ButtonProps> = ({ ...props }) => {
    const { t } = useTranslation();
    return <Button {...props}>{t("Cancel")}</Button>;
};

export default CancelButton;
