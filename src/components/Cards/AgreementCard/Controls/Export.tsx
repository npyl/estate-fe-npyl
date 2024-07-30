import { useLazyGetAgreementByIdQuery } from "@/services/agreements";
import { flattenObject } from "@/sections/agreements/Dialogs/PDFEditor/util";
import { useGeneratePDF } from "@/sections/agreements/Dialogs/_shared/hook";
import downloadBlob from "@/utils/downloadBlob";
import LoadingIconButton from "@/components/LoadingIconButton";
import DownloadIcon from "@mui/icons-material/Download";
import { MouseEvent } from "react";
import dayjs from "dayjs";

const getAuto = (date: string) => {
    const dateObject = dayjs(date, "YYYY-MM-DD");

    return {
        auto: {
            day: dateObject.date(),
            month: dateObject.month() + 1,
            year: Number(dateObject.format("YY")),
        },
    };
};

interface Props {
    agreementId: number;
}

const ExportButton: React.FC<Props> = ({ agreementId }) => {
    const [getAgreement] = useLazyGetAgreementByIdQuery();

    const { generatePDF, isGenerating } = useGeneratePDF();

    const handleGenerate = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const agreement = await getAgreement(agreementId).unwrap();

        const { variant, language, title, formData } = agreement || {};
        const { additional } = formData || {};

        const data = {
            ...formData,
            ...getAuto(additional?.date),
        };

        const inputs = [flattenObject(data)];

        const pdf = await generatePDF(variant?.key!, language?.key!, inputs);
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
