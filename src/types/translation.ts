import { TFunction } from "i18next";

export type TranslationType = TFunction<"Translation", undefined>;

// Currently only these two are supported
export type TLanguageType = "en" | "el";
