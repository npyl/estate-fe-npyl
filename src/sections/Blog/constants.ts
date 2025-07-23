import { KeyValue } from "@/types/KeyValue";
import { TranslationType } from "@/types/translation";

const getCATEGORIES = (t: TranslationType): KeyValue[] => [
    { key: "PURCHASE_GREECE", value: t("Purchase in Greece") },
    { key: "PURCHASE_PATRAS", value: t("Purchase in Patras") },
    { key: "PURCHASE_ABROAD", value: t("Purchase Abroad") },
    { key: "NEWS", value: t("News") },
    { key: "GUIDES_ADVICE", value: t("Guides and Advice") },
    { key: "DREAM_HOMES", value: t("Dream Homes") },
    { key: "STUDENT_NEWS", value: t("Student News") },
    { key: "LEGAL_TECHNICAL", value: t("Legal and Technical") },
    { key: "TOURISM_ATHENS", value: t("Tourism in Athens") },
];

export { getCATEGORIES };
