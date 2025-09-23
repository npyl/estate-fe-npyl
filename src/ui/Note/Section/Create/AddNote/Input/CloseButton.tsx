import Button, { ButtonProps } from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CancelIcon from "@mui/icons-material/Cancel";

interface CloseButtonProps extends Omit<ButtonProps, "endIcon" | "size"> {}

const CloseButton: FC<CloseButtonProps> = (props) => {
    const { t } = useTranslation();
    return (
        <Button size="small" endIcon={<CancelIcon />} {...props}>
            {t("Close")}
        </Button>
    );
};

export default CloseButton;
