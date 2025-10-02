import { Stack } from "@mui/material";
import { FC, useRef, useState } from "react";
import Pane, { PaneRef } from "./Pane";
import useMinMaxControl from "./useMinMaxControl";

// --------------------------------------------------------------------------------------

interface ContentProps {
    symbol: string;
    ceiling: string;

    valueMin?: number;
    valueMax?: number;
    setMin: (v?: number) => void;
    setMax: (v?: number) => void;

    generateNumbers: () => number[];
}

const Content: FC<ContentProps> = ({
    ceiling,
    symbol,
    // ...
    valueMin,
    valueMax,
    setMin: _setMin,
    setMax: _setMax,
    // ...
    generateNumbers,
}) => {
    const fromRef = useRef<PaneRef>(null);
    const toRef = useRef<PaneRef>(null);

    const [options] = useState(generateNumbers());
    const genericProps = { symbol, ceiling, options };

    const { setMin, setMax, clearMin, clearMax } = useMinMaxControl(
        valueMin,
        valueMax,
        _setMin,
        _setMax,
        fromRef,
        toRef
    );

    return (
        <Stack direction="row" spacing={1}>
            <Pane
                ref={fromRef}
                label="from"
                // ...
                {...genericProps}
                // ...
                value={valueMin}
                setter={setMin}
                clear={clearMin}
            />
            <Pane
                ref={toRef}
                label="to"
                // ...
                {...genericProps}
                // ...
                value={valueMax}
                setter={setMax}
                clear={clearMax}
            />
        </Stack>
    );
};

export type { ContentProps };
export default Content;
