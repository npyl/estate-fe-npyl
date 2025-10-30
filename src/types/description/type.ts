import { Language } from "@/components/LanguageButton/types";

interface DescriptionEntry {
    title: string;
    description: string;
    descriptionText: string;
}

interface DescriptionEntryPOST extends DescriptionEntry {
    language: Language;
}

export type { DescriptionEntry, DescriptionEntryPOST };
