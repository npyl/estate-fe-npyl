import { useLazyGetAgreementByIdQuery } from "@/services/agreements";
import { useGeneratePDF } from "@/sections/agreements/Dialogs/_shared/hook";
import downloadBlob from "@/utils/downloadBlob";
import LoadingIconButton from "@/components/LoadingIconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { MouseEvent } from "react";

interface Props {
    agreementId: number;
}

const ExportButton: React.FC<Props> = ({ agreementId }) => {
    const [getAgreement] = useLazyGetAgreementByIdQuery();

    const { generatePDF, isGenerating } = useGeneratePDF();

    const handleGenerate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const agreement = await getAgreement(agreementId).unwrap();
        if (!agreement) return;

        const { variant, language, title, formData } = agreement || {};

        const pdf = await generatePDF(variant?.key!, language?.key!, formData);
        if (!pdf) return;

        const blob = new Blob([pdf.buffer], { type: "application/pdf" });

        downloadBlob(blob, `${title}.pdf`);
    };

    return (
        <LoadingIconButton loading={isGenerating} onClick={handleGenerate}>
            <DownloadIcon />
        </LoadingIconButton>
    );
};

export default ExportButton;
