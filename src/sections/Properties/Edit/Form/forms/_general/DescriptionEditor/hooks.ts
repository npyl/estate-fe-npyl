import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Language } from "@/components/LanguageButton/types";
import { IOpenAIDetailsPOST } from "src/types/openai";

// Utility function to join elements with a comma, excluding nullish or empty values
const joinWithComma = (...elements: (string | null | undefined)[]): string => {
    return elements.filter((el) => el !== "" && el != null).join(", ");
};

export const useOpenAIDetails = (
    lang: Language
): { openAIDetails: IOpenAIDetailsPOST } => {
    const region = useWatch({ name: "location.region" });
    const city = useWatch({ name: "location.city" });
    const complex = useWatch({ name: "location.complex" });

    const street = useWatch({ name: "location.street" });
    const number = useWatch({ name: "location.number" });
    const zipCode = useWatch({ name: "location.zipCode" });

    const location = useMemo(
        () => joinWithComma(region, city, complex, street, number, zipCode),
        [region, city, complex, street, number, zipCode]
    );

    const price = useWatch({ name: "price" });
    const plotArea = useWatch({ name: "plotArea" });

    const yearOfConstruction = useWatch({
        name: "construction.yearOfConstruction",
    });
    const yearOfRenovation = useWatch({
        name: "construction.yearOfRenovation",
    });
    const layers = useWatch({ name: "details.layers" });
    const kitchens = useWatch({ name: "details.kitchens" });
    const bathrooms = useWatch({ name: "details.bathrooms" });
    const livingrooms = useWatch({ name: "details.livingrooms" });
    const balconies = useWatch({ name: "areas.balconies" });
    const attic = useWatch({
        name: "details.attic",
    });
    const storeroom = useWatch({
        name: "details.storeroom",
    });
    const safetyDoor = useWatch({
        name: "technicalFeatures.safetyDoor",
    });
    const fireplace = useWatch({
        name: "technicalFeatures.fireplace",
    });
    const suitableForStudent = useWatch({
        name: "suitableFor.student",
    });
    const pool = useWatch({
        name: "features.pool",
    });
    const distanceFromPublicTransportation = useWatch({
        name: "distances.publicTransport",
    });
    const distanceFromSea = useWatch({ name: "distances.sea" });
    const distanceFromSupermarket = useWatch({ name: "distances.supermarket" });

    const category = useWatch({ name: "category" });
    const state = useWatch({ name: "state" });
    const furnished = useWatch({ name: "technicalFeatures.furnished" });
    const floor = useWatch({ name: "details.floor" });
    const frameType = useWatch({ name: "technicalFeatures.frameType" });
    const floorType = useWatch({ name: "technicalFeatures.floorType" });
    const energyClass = useWatch({ name: "heatingAndEnergy.energyClass" });

    return {
        openAIDetails: {
            location,
            price,
            plotArea,
            yearOfConstruction,
            yearOfRenovation,
            layers,
            kitchens,
            bathrooms,
            livingrooms,
            balconies,
            attic,
            storeroom,
            safetyDoor,
            fireplace,
            suitableForStudent,
            pool,
            distanceFromPublicTransportation,
            distanceFromSea,
            distanceFromSupermarket,
            language: lang === "en" ? "English" : "Greek",

            // Dropdowns
            category,
            state,
            furnished,
            floor,
            frameType,
            floorType,
            energyClass,
        },
    };
};
