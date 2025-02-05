export type Language = "en" | "el";

export type LanguageOptions = {
    [key in Language]: {
        icon?: string;
        label: string;
        description?: string;
    };
};
