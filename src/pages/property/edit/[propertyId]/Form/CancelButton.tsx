import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";
import { FC } from "react";

interface CancelButtonProps {
    onClick: VoidFunction;
}

const CancelButton: FC<CancelButtonProps> = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <Button variant="outlined" startIcon={<CancelIcon />} onClick={onClick}>
            {t("Cancel")}
        </Button>
    );
};

export default CancelButton;
