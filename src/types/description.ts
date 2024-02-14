import { Language } from "src/components/Language/types";

export interface DescriptionEntry {
    title: string;
    description: string;
    descriptionText: string;
}

export interface DescriptionEntryPOST extends DescriptionEntry {
    language: Language;
}
