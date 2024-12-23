import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Language } from "src/components/Language/types";
import { IOpenAIDetailsPOST } from "src/types/openai";

// Utility function to join elements with a comma, excluding nullish or empty values
const joinWithComma = (...elements: (string | null | undefined)[]): string => {
    return elements.filter((el) => el !== "" && el != null).join(", ");
};

export const useOpenAIDetails = (
    lang: Language
): { openAIDetails: IOpenAIDetailsPOST } => {
    const { watch } = useFormContext();

    const region = watch("location.region");
    const city = watch("location.city");
    const complex = watch("location.complex");

    const street = watch("location.street");
    const number = watch("location.number");
    const zipCode = watch("location.zipCode");

    const location = useMemo(
        () => joinWithComma(region, city, complex, street, number, zipCode),
        [region, city, complex, street, number, zipCode]
    );

    return {
        openAIDetails: {
            location,
            price: watch("price"),
            plotArea: watch("plotArea"),
            yearOfConstruction: watch("construction.yearOfConstruction"),
            yearOfRenovation: watch("construction.yearOfRenovation"),
            layers: watch("details.layers"),
            kitchens: watch("details.kitchens"),
            bathrooms: watch("details.bathrooms"),
            livingrooms: watch("details.livingrooms"),
            balconies: watch("areas.balconies"),
            attic: watch("details.attic"),
            storeroom: watch("details.storeroom"),
            safetyDoor: watch("technicalFeatures.safetyDoor"),
            fireplace: watch("technicalFeatures.fireplace"),
            suitableForStudent: watch("suitableFor.student"),
            pool: watch("features.pool"),
            distanceFromPublicTransportation: watch(
                "distances.publicTransport"
            ),
            distanceFromSea: watch("distances.sea"),
            distanceFromSupermarket: watch("distances.supermarket"),
            language: lang === "en" ? "English" : "Greek",

            // Dropdowns
            category: watch("category"),
            state: watch("state"),
            furnished: watch("technicalFeatures.furnished"),
            floor: watch("details.floor"),
            frameType: watch("technicalFeatures.frameType"),
            floorType: watch("technicalFeatures.floorType"),
            energyClass: watch("heatingAndEnergy.energyClass"),
        },
    };
};
