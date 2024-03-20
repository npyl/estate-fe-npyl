import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLazyAllGlobalsQuery } from "src/services/global";
import { IGlobal } from "src/types/global";

export const useGlobals = () => {
    const { i18n } = useTranslation();
    const [getGlobals] = useLazyAllGlobalsQuery();
    const [result, setResult] = useState<IGlobal>();

    useEffect(() => {
        /* INFO: backend wants it el (not gr) */
        const language = i18n.language === "el" ? "el" : i18n.language;

        getGlobals(language)
            .unwrap()
            .then((res) => setResult(res));
    }, [i18n.language]);

    return result;
};
