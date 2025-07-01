import {
    selectMaxPrice,
    selectMinPrice,
    setMaxPrice,
    setMinPrice,
} from "src/slices/customer/filters";
import RangeSelect from "@/ui/Filters/Range";
import usePriceRangeGenerator from "./usePriceGenerator";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const PriceSelect = () => {
    const dispatch = useDispatch();

    const { generateNumbers } = usePriceRangeGenerator();

    const minPrice = useSelector(selectMinPrice);
    const maxPrice = useSelector(selectMaxPrice);

    const onSetMinPrice = useCallback(
        (v?: number) => dispatch(setMinPrice(v)),
        []
    );
    const onSetMaxPrice = useCallback(
        (v?: number) => dispatch(setMaxPrice(v)),
        []
    );

    return (
        <RangeSelect
            type="price"
            valueMin={minPrice}
            valueMax={maxPrice}
            setMin={onSetMinPrice}
            setMax={onSetMaxPrice}
            generateNumbers={generateNumbers}
        />
    );
};

export default PriceSelect;
