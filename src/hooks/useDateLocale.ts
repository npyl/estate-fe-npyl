import { useTranslation } from "react-i18next";

type TDateLocale = "en-US" | "el-GR";

/**
 * Hook that returns apps's locale depending on app language
 */
const useDateLocale = (): TDateLocale => {
    const { i18n } = useTranslation();
    const locale = i18n.language === "en" ? "en-US" : "el-GR";
    return locale;
};

export type { TDateLocale };
export default useDateLocale;
