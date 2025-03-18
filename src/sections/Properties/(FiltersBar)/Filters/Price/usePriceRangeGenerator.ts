import generatePriceRange from "@/sections/Filters/priceRangeGenerator";
import { selectStates } from "@/slices/filters";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const usePriceRangeGenerator = () => {
    const states = useSelector(selectStates);

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
