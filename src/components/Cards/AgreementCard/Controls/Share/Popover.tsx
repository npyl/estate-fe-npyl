import { FC, useCallback } from "react";
import { useGeneratePDF } from "@/sections/agreements/Dialogs/_shared/hook";
import { useLazyGetAgreementByIdQuery } from "@/services/agreements";
import Share, { SharePopoverProps } from "@/components/Share";

interface AgreementShareProps extends SharePopoverProps {
    agreementId: number;
}

const AgreementShare: FC<AgreementShareProps> = ({ agreementId, ...props }) => {
    const [getAgreement] = useLazyGetAgreementByIdQuery();
    const { generatePDF } = useGeneratePDF();

    const getter = useCallback(async () => {
        const agreement = await getAgreement(agreementId).unwrap();
        if (!agreement) return null;

        const { variant, language, title, formData } = agreement || {};

        const pdf = await generatePDF(variant?.key!, language?.key!, formData);
        if (!pdf) return null;

        const filename = `${title}.pdf`;
        const file = new File([pdf.buffer as BlobPart], filename, {
            type: "application/pdf",
        });

        return [file];
    }, [agreementId]);

    return <Share files getFiles={getter} {...props} />;
};

export default AgreementShare;
