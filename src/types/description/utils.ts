import { DescriptionEntry } from "./type";

const getTitleSafe = (
    lang: string,
    descriptions?: Record<string, DescriptionEntry>
) => {
    try {
        const locale = lang === "gr" ? "el" : lang;
        const title = descriptions?.[locale]?.title || "";
        return title;
    } catch {
        return "";
    }
};

export { getTitleSafe };
