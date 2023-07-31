export type Language = "en" | "gr";

export type LanguageOptions = {
    [key in Language]: {
        icon: string;
        label: string;
    };
};
