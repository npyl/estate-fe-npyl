import { TABS } from "./constants";

const useNames = (lang: string) => {
    const index = TABS.findIndex(({ value }) => lang === value);

    const name = (s: string) => `descriptions[${index}].${s}`;

    const title = name("title");
    const descriptionName = name("description"); // encoded
    const descriptionTextName = name("descriptionText"); // plain

    return { title, descriptionName, descriptionTextName };
};

export default useNames;
