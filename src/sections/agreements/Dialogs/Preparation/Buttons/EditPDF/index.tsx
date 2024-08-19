import Button, { ButtonProps } from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import PDFErrorsTooltip from "./PDFErrorsTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";

const EditPDFButton: React.FC<ButtonProps> = (props) => {
    const { t } = useTranslation();

    return (
        <Button {...props} startIcon={<EditNoteIcon />}>
            {t("Edit PDF")}
            <PDFErrorsTooltip />
        </Button>
    );
};

export default EditPDFButton;
