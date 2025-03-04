import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import PDFErrorsTooltip from "./PDFErrorsTooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useWatch } from "react-hook-form";
import { TForm } from "../../types";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const PDFEditorDialog = dynamic(() => import("../../../PDFEditor"));

const EditPDFButton = () => {
    const { t } = useTranslation();

    const variant = useWatch<TForm>({ name: "variant" });
    const isPurchase = variant === "PURCHASE";

    const [isPDFOpen, openPDF, closePDF] = useDialog();

    return (
        <>
            <Button startIcon={<EditNoteIcon />} onClick={openPDF}>
                {t("Edit PDF")}
                <PDFErrorsTooltip />
            </Button>

            {isPDFOpen ? (
                <PDFEditorDialog
                    suggestProperties={isPurchase}
                    onClose={closePDF}
                />
            ) : null}
        </>
    );
};

export default EditPDFButton;
