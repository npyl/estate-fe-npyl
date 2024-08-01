import {
    CardLabel,
    CardLabelProps,
} from "@/components/Cards/AgreementCard/Labels";
import { useTranslation } from "react-i18next";

const TranslatedCardLabel: React.FC<CardLabelProps> = ({ variant, name }) => {
    const { t } = useTranslation();
    const translatedName = t(`_${variant}_`);
    return <CardLabel variant={variant} name={translatedName} />;
};

export default TranslatedCardLabel;
