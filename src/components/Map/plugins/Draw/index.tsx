import useDraw from "./useDraw";
import Picker from "./Picker";
import { FC } from "react";
import { DrawProps } from "./types";
import getShape from "./getShape";

const Draw: FC<DrawProps> = ({ shapes = [], onClear = () => {}, ...props }) => {
    const {
        // ...
        drawCircle,
        drawPolygon,
        drawRectangle,
    } = useDraw(props);

    return (
        <>
            {shapes.map(getShape(props?.onShapeChange))}

            <Picker
                drawCircle={drawCircle}
                drawPolygon={drawPolygon}
                drawRectangle={drawRectangle}
                // ...
                clear={onClear}
            />
        </>
    );
};

export default Draw;
