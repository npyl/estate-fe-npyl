import useDraw from "./useDraw";
import { FC } from "react";
import { DrawProps } from "./types";
import getShape from "./getShape";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import("./Picker"));

const Draw: FC<DrawProps> = ({
    drawing = false,
    shapes,
    onClear = () => {},
    ...props
}) => {
    const {
        // ...
        drawCircle,
        drawPolygon,
        drawRectangle,
    } = useDraw(props);

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

export default Draw;
