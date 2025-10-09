import usePriceRangeGenerator from "@/sections/Properties/(FiltersBar)/Filters/Price/usePriceRangeGenerator";
import RangeSelect, { RangeSelectProps } from "@/ui/Filters/Range";
import { FC, useState } from "react";

/**
 * The RangeSelect requires "Controlled" usage to function properly; therefore provide it with a state
 */
const useLocalState = (
    _setMin: (v?: number) => void,
    _setMax: (v?: number) => void
) => {
    const [localMin, setLocalMin] = useState<number>();
    const [localMax, setLocalMax] = useState<number>();

    const setMin = (v?: number) => {
        setLocalMin(v);
        _setMin(v);
    };

    const setMax = (v?: number) => {
        setLocalMax(v);
        _setMax(v);
    };

    return { valueMin: localMin, valueMax: localMax, setMin, setMax };
};

interface TesterProps
    extends Omit<
            RangeSelectProps,
            "open" | "type" | "generateNumbers" | "valueMin" | "valueMax"
        >,
        Required<Pick<TesterProps, "setMin" | "setMax">> {}

const Tester: FC<TesterProps> = ({ setMin, setMax, ...props }) => {
    const { generateNumbers } = usePriceRangeGenerator();

    const state = useLocalState(setMin, setMax);

    return (
        <RangeSelect
            open
            type="price"
            generateNumbers={generateNumbers}
            // ...
            {...state}
            // ...
            {...props}
        />
    );
};

export default Tester;
