import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getOptions } from "./constants";

const useSortingOptions = () => {
    const { t } = useTranslation();
    const sortingOptions = useMemo(() => getOptions(t), [t]);
    return sortingOptions;
};

export default useSortingOptions;
