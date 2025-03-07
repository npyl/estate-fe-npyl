import { TShape } from "@/types/shape";
import { DrawShape, StopDraw } from "../../types";
import useDraw from "./useDraw";
import Picker from "./Picker";

interface DrawProps {
    shape?: TShape;
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

const Draw = ({ shape, onDraw, onShapeChange }: DrawProps) => {
    const shapes = shape ? [shape] : [];

    const {
        drawCircle,
        drawPolygon,
        drawRectangle,
        // ...
        clear,
    } = useDraw("SINGLE", shapes, onDraw, onShapeChange);

    return (
        <Picker
            drawCircle={drawCircle}
            drawPolygon={drawPolygon}
            drawRectangle={drawRectangle}
            // ...
            clear={clear}
        />
    );
};

export default Draw;
