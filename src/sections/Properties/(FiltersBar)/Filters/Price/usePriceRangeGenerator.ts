import generatePriceRange from "@/ui/Filters/priceRangeGenerator";
import { useStates } from "@/sections/Properties/FiltersContext";
import { useCallback } from "react";

// (RENT & RENTED) or (RENT or RENTED) or nothing -> 2, 1, 0 lengths, respectively
const getRentState = (states: string[]) => {
    const isRent = states.includes("RENT");
    const isRented = states.includes("RENTED");

    if (isRent && isRented) return 2;
    if (isRent || isRented) return 1;
    return 0;
};

const usePriceRangeGenerator = () => {
    const states = useStates();

    const rentLength = getRentState(states);

    const isRent = rentLength > 0;
    const isSale = states.length > rentLength;
    const isNothing = states.length === 0;

    const generateNumbers = useCallback(
        () => generatePriceRange(isNothing, isRent, isSale),
        [isNothing, isRent, isSale]
    );

    return { generateNumbers };
};

export default usePriceRangeGenerator;
