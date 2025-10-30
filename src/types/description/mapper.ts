import { DescriptionEntry, DescriptionEntryPOST } from "@/types/description";

const DEFAULT_DESCRIPTION_EL: DescriptionEntryPOST = {
    description: "",
    descriptionText: "",
    title: "",
    language: "el",
};

const DEFAULT_DESCRIPTION_EN: DescriptionEntryPOST = {
    description: "",
    descriptionText: "",
    title: "",
    language: "en",
};

const DEFAULT_DESCRIPTIONS = [DEFAULT_DESCRIPTION_EL, DEFAULT_DESCRIPTION_EN];

const descriptionsToDescriptionsReq = (
    descriptions?: Record<string, DescriptionEntry>
): DescriptionEntryPOST[] => {
    if (!descriptions) return DEFAULT_DESCRIPTIONS;

    return [
        {
            description: descriptions["el"]?.description || "",
            descriptionText: "",
            title: descriptions["el"]?.title || "",
            language: "el",
        },
        {
            description: descriptions["en"]?.description || "",
            descriptionText: "",
            title: descriptions["en"]?.title || "",
            language: "en",
        },
    ];
};

export { descriptionsToDescriptionsReq };
