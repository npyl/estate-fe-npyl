import usePriceRangeGenerator from "@/sections/Properties/(FiltersBar)/Filters/Price/usePriceRangeGenerator";
import RangeSelect, { RangeSelectProps } from "@/ui/Filters/Range";
import { FC } from "react";

interface TesterProps
    extends Omit<RangeSelectProps, "open" | "type" | "generateNumbers"> {}

const Tester: FC<TesterProps> = (props) => {
    const { generateNumbers } = usePriceRangeGenerator();

    return (
        <RangeSelect
            open
            type="price"
            generateNumbers={generateNumbers}
            {...props}
        />
    );
};

export default Tester;
