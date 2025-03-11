enum LocationDisplay {
    NOT_VISIBLE = "NOT_VISIBLE",
    GENERAL = "GENERAL",
    EXACT = "EXACT",
}

type PreferredLanguageType = "ENGLISH" | "GREEK";

type Enum<T> = T | null;

const PreferredToI18Language = (p: PreferredLanguageType) =>
    p === "ENGLISH" ? "en" : "el";

export type { PreferredLanguageType, Enum };
export {
    LocationDisplay,
    // ...
    PreferredToI18Language,
};
