import { useCallback, useMemo } from "react";
import { TABS } from "./constants";

const useNames = (lang: string) => {
    const index = useMemo(
        () => TABS.findIndex(({ value }) => lang === value),
        [lang]
    );

    const name = useCallback(
        (s: string) => `descriptions[${index}].${s}`,
        [index]
    );

    const title = name("title");
    const descriptionName = name("description"); // encoded
    const descriptionTextName = name("descriptionText"); // plain

    return { title, descriptionName, descriptionTextName };
};

export default useNames;
