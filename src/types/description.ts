import { Language } from "@/components/LanguageButton/types";

export interface DescriptionEntry {
    title: string;
    description: string;
    descriptionText: string;
}

export interface DescriptionEntryPOST extends DescriptionEntry {
    language: Language;
}
