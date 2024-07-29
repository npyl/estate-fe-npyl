import { IAgreementType } from "@/types/agreements";
import { PreferredLanguageType } from "@/types/enums";

interface Props {
    variant: IAgreementType;
    language: PreferredLanguageType;
}

const PDFViewer: React.FC<Props> = ({ variant, language }) => {
    return null;
};

export default PDFViewer;
