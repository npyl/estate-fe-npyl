import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import { useGeneratePDF } from "@/sections/agreements/Dialogs/_shared/hook";
import { useLazyGetAgreementByIdQuery } from "@/services/agreements";
import downloadBlob from "@/utils/downloadBlob";
import LoadingIconButton from "@/components/LoadingIconButton";

const openMailClient = (title: string, email: string) => {
    const mailtoLink = `mailto:${email}?subject=${title}&body=Please add the attachment!`;
    window.location.href = mailtoLink;
};

interface Props {
    agreementId: number;
}

const ShareButton: React.FC<Props> = ({ agreementId }) => {
    const [getAgreement] = useLazyGetAgreementByIdQuery();
    const { generatePDF, isGenerating } = useGeneratePDF();

    const handleClick = async () => {
        const agreement = await getAgreement(agreementId).unwrap();
        if (!agreement) return;

        const { variant, language, title, formData } = agreement || {};

        const pdf = await generatePDF(variant?.key!, language?.key!, formData);
        if (!pdf) return;

        const blob = new Blob([pdf.buffer as BlobPart], {
            type: "application/pdf",
        });

        downloadBlob(blob, `${title}.pdf`);

        openMailClient(title, formData.owner.email);
    };

    return (
        <LoadingIconButton
            loading={isGenerating}
            disabled={isGenerating}
            onClick={handleClick}
        >
            <ShareIcon />
        </LoadingIconButton>
    );
};

export default ShareButton;
