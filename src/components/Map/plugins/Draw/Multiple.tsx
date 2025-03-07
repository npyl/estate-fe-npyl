import { TShape } from "@/types/shape";
import { DrawShape, StopDraw } from "../../types";
import useDraw from "./useDraw";
import Picker from "./Picker";

interface DrawMultipleProps {
    shapes?: TShape[];
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

const DrawMultiple = ({
    shapes = [],
    onDraw,
    onShapeChange,
}: DrawMultipleProps) => {
    const {
        drawCircle,
        drawRectangle,
        drawPolygon,
        // ...
        clear,
    } = useDraw("MULTIPLE", shapes, onDraw, onShapeChange);

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

export default DrawMultiple;
