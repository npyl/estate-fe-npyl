import { useTranslation } from "react-i18next";
import { TCalendarLocale } from "./types";

/**
 * Hook that returns calendar's locale depending on app language
 */
const useCalendarLocale = (): TCalendarLocale => {
    const { i18n } = useTranslation();
    const locale = i18n.language === "en" ? "en-US" : "el-GR";
    return locale;
};

export default useCalendarLocale;
