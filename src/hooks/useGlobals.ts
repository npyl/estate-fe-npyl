import { useTranslation } from "react-i18next";
import { useAllGlobalsQuery } from "src/services/global";

export const useGlobals = () => {
    const { i18n } = useTranslation();
    const language = i18n.language === "el" ? "el" : i18n.language;
    const { data: result } = useAllGlobalsQuery(language);
    return result;
};
