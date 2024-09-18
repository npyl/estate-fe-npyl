import { IGeoLocation } from "@/types/geolocation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import isNumberString from "./util";

const useHumanReadable = (
    code: string | undefined,
    data: IGeoLocation[] | undefined
) => {
    const { i18n } = useTranslation();

    const greekVersion = useMemo(() => i18n.language === "el", [i18n.language]);

    const result = useMemo(() => {
        if (!code) return "";

        if (!isNumberString(code)) return code;

        const found = data?.find((r) => r.areaID === +code);

        return (greekVersion ? found?.nameGR : found?.nameEN) || "";
    }, [code, data, greekVersion]);

    return result;
};

const useHumanReadableCallback = () => {
    const { i18n } = useTranslation();

    const greekVersion = useMemo(() => i18n.language === "el", [i18n.language]);

    const getHumanReadable = (
        code: string | undefined,
        data: IGeoLocation[] | undefined
    ) => {
        if (!code) return "";
        if (!isNumberString(code)) return code;

        const found = data?.find((r) => r.areaID === +code);

        return (greekVersion ? found?.nameGR : found?.nameEN) || "";
    };

    return { getHumanReadable };
};

export { useHumanReadableCallback };
export default useHumanReadable;
