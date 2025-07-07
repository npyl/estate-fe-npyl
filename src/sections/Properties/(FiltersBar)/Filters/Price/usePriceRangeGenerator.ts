import generatePriceRange from "@/ui/Filters/priceRangeGenerator";
import { useStates } from "@/sections/Properties/FiltersContext";
import { useCallback } from "react";

const usePriceRangeGenerator = () => {
    const states = useStates();

    // (RENT & RENTED) or (RENT or RENTED) or nothing -> 2, 1, 0 lengths, respectively
    const rentLength =
        states.includes("RENT") && states.includes("RENTED")
            ? 2
            : states.includes("RENT") || states.includes("RENTED")
              ? 1
              : 0;

    const isRent = rentLength > 0;
    const isSale = states.length > rentLength;
    const nothingSelected = states.length === 0;

    const generateNumbers = useCallback(
        () => generatePriceRange(nothingSelected, isRent, isSale),
        [nothingSelected, isRent, isSale]
    );

    return { generateNumbers };
};

export default usePriceRangeGenerator;
