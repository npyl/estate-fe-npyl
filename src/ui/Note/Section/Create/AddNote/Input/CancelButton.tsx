import Button, { ButtonProps } from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CancelIcon from "@mui/icons-material/Cancel";

interface CancelButtonProps extends Omit<ButtonProps, "endIcon" | "size"> {}

const CancelButton: FC<CancelButtonProps> = (props) => {
    const { t } = useTranslation();
    return (
        <Button size="small" endIcon={<CancelIcon />} {...props}>
            {t("Cancel")}
        </Button>
    );
};

export default CancelButton;
