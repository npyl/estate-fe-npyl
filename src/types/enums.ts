export enum LocationDisplay {
    NOT_VISIBLE = "NOT_VISIBLE",
    GENERAL = "GENERAL",
    EXACT = "EXACT",
}

export type PreferredLanguageType = "ENGLISH" | "GREEK";

export const PreferredToI18Language = (p: PreferredLanguageType) =>
    p === "ENGLISH" ? "en" : "el";
