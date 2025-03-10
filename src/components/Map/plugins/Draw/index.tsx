import useDraw from "./useDraw";
import Picker from "./Picker";
import { forwardRef, useImperativeHandle } from "react";
import { DrawProps } from "./types";

interface DrawRef {
    load: VoidFunction;
}

const Draw = forwardRef<DrawRef, DrawProps>((props, ref) => {
    const {
        load,
        // ...
        drawCircle,
        drawPolygon,
        drawRectangle,
        // ...
        clear,
        // ...
        Renderer,
    } = useDraw(props);

    useImperativeHandle(
        ref,
        () => ({
            load,
        }),
        [load]
    );

    return (
        <>
            {Renderer}

            <Picker
                drawCircle={drawCircle}
                drawPolygon={drawPolygon}
                drawRectangle={drawRectangle}
                // ...
                clear={clear}
            />
        </>
    );
});

Draw.displayName = "Draw";

export type { DrawRef };
export default Draw;
