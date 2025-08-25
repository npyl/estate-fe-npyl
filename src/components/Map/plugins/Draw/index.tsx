import useDraw from "./useDraw";
import { FC, useCallback } from "react";
import { DrawProps } from "./types";
import getShape from "./getShape";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("./Picker"));

const Draw: FC<DrawProps> = ({ drawing = false, shapes, ...props }) => {
    const {
        // ...
        drawCircle,
        drawPolygon,
        drawRectangle,
    } = useDraw(props);

    const onClear = useCallback(() => props?.onDraw?.(null), [props?.onDraw]);

    return (
        <>
            {shapes.map(getShape(props?.onShapeChange))}

            {drawing ? (
                <Picker
                    drawCircle={drawCircle}
                    drawPolygon={drawPolygon}
                    drawRectangle={drawRectangle}
                    // ...
                    clear={onClear}
                />
            ) : null}
        </>
    );
};

export * from "./Picker";
export default Draw;
