import { Stack } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Props } from "./types";
import Pane, { PaneRef } from "./Pane";
import useMinMaxControl from "./useMinMaxControl";

// --------------------------------------------------------------------------------------

const Content: FC<Props> = ({
    type,
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
                type={type}
                options={options}
                label="from"
                value={valueMin}
                setter={setMin}
                clear={clearMin}
            />
            <Pane
                ref={toRef}
                type={type}
                options={options}
                label="to"
                value={valueMax}
                setter={setMax}
                clear={clearMax}
            />
        </Stack>
    );
};

export default Content;
