import Button, { ButtonProps } from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import PDFErrorsTooltip from "./PDFErrorsTooltip";

const EditPDFButton: React.FC<ButtonProps> = (props) => {
    const { t } = useTranslation();

    return (
        <>
            <Button
                {...props}
                sx={{
                    position: "relative",
                }}
            >
                {t("Edit PDF")}
            </Button>

            <PDFErrorsTooltip />
        </>
    );
};

export default EditPDFButton;
