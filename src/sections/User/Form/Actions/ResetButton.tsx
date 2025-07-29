import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useDialog from "@/hooks/useDialog";

const ResetButton = () => {
    const { t } = useTranslation();
    const [isOpen, open, close] = useDialog();
    return (
        <>
            <Button onClick={open} color="primary">
                {t("Reset Password")}
            </Button>
        </>
    );
};

export default ResetButton;
