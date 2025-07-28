import generatePriceRange from "@/ui/Filters/priceRangeGenerator";
import { useCallback } from "react";
import { useBuyer, useLeaser, useLessor, useSeller } from "../../Context";

const usePriceRangeGenerator = () => {
    const leaser = useLeaser();
    const buyer = useBuyer();
    const seller = useSeller();
    const lessor = useLessor();

    const isRent = Boolean(leaser) || Boolean(lessor);
    const isSale = Boolean(buyer) || Boolean(seller);
    const nothingSelected = !isRent && !isSale;

    const generateNumbers = useCallback(
        () => generatePriceRange(nothingSelected, isRent, isSale),
        [nothingSelected, isRent, isSale]
    );

    return { generateNumbers };
};

export default usePriceRangeGenerator;
