import { useFormContext } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import { useGeneratePDF } from "../../_shared/hook";
import { IAgreementReq } from "@/types/agreements";
import downloadBlob from "@/utils/downloadBlob";
import { useEffect, useState } from "react";

const ExportButton = () => {
    const { t } = useTranslation();

    const {
        watch,
        formState: { isSubmitSuccessful },
    } = useFormContext();

    const [visible, setVisible] = useState(false);

    const all = watch() as IAgreementReq;
    const { variant, language, title } = all;

    const { generatePDF, isGenerating } = useGeneratePDF();

    const handleGenerate = async () => {
        const pdf = await generatePDF(variant, language, all);
        if (!pdf) return;

        const blob = new Blob([pdf.buffer], { type: "application/pdf" });

        await downloadBlob(blob, `${title}.pdf`);

        setVisible(false);
    };

    useEffect(() => {
        if (!isSubmitSuccessful) return;
        setVisible(true);
    }, [isSubmitSuccessful]);

    if (!visible) return null;

    return (
        <LoadingButton loading={isGenerating} onClick={handleGenerate}>
            {t("Export")}
        </LoadingButton>
    );
};

export default ExportButton;
