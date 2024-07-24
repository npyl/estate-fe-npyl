import { useFormContext } from "react-hook-form";
import { flattenObject } from "../../PDFEditor/util";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useGeneratePDF } from "../../_shared/hook";
import { IAgreementReq } from "@/types/agreements";
import downloadBlob from "@/utils/downloadBlob";

const ExportButton = () => {
    const { t } = useTranslation();

    const {
        watch,
        formState: { isSubmitSuccessful },
    } = useFormContext();

    const all = watch() as IAgreementReq;
    const { variant, language, title } = all;
    const inputs = [flattenObject(all)];

    const { generatePDF, isGenerating } = useGeneratePDF(
        variant,
        language,
        inputs
    );

    const handleGenerate = async () => {
        const pdf = await generatePDF();
        if (!pdf) return;

        const blob = new Blob([pdf.buffer], { type: "application/pdf" });

        downloadBlob(blob, `${title}.pdf`);
    };

    // TODO: test isSubmitSuccessful

    if (!isSubmitSuccessful) return null;

    return (
        <LoadingButton loading={isGenerating} onClick={handleGenerate}>
            {t("Export")}
        </LoadingButton>
    );
};

export default ExportButton;
