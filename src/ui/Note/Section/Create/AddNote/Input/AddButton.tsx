import Button, { ButtonProps } from "@mui/material/Button";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import SendIcon from "@mui/icons-material/Send";

interface AddButtonProps extends Omit<ButtonProps, "endIcon" | "size"> {}

const AddButton: FC<AddButtonProps> = (props) => {
    const { t } = useTranslation();
    return (
        <Button size="small" endIcon={<SendIcon />} {...props}>
            {t("Send")}
        </Button>
    );
};

export default AddButton;
