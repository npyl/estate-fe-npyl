import generatePriceRange from "@/sections/Filters/priceRangeGenerator";
import {
    selectBuyer,
    selectLeaser,
    selectLessor,
    selectSeller,
} from "@/slices/customer/filters";
import { useCallback } from "react";
import { useSelector } from "react-redux";

const usePriceRangeGenerator = () => {
    const leaser = useSelector(selectLeaser);
    const buyer = useSelector(selectBuyer);
    const seller = useSelector(selectSeller);
    const lessor = useSelector(selectLessor);

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
