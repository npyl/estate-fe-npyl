import { useFormContext } from "react-hook-form";
import { flattenObject } from "../../PDFEditor/util";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useGeneratePDF } from "../../_shared/hook";

const ExportButton = () => {
    const { t } = useTranslation();

    const {
        watch,
        formState: { isSubmitSuccessful },
    } = useFormContext();

    const all = watch();
    const { variant, lang } = all;
    const inputs = [flattenObject(all)];

    const { generatePDF, isGenerating } = useGeneratePDF(variant, lang, inputs);

    const handleGenerate = async () => {
        const pdf = await generatePDF();
        if (!pdf) return;

        const blob = new Blob([pdf.buffer], { type: "application/pdf" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "generated_document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // if (!isSubmitSuccessful) return null;

    return (
        <LoadingButton loading={isGenerating} onClick={handleGenerate}>
            {t("Export")}
        </LoadingButton>
    );
};

export default ExportButton;
