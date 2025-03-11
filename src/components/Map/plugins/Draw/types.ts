import { TShape } from "@/types/shape";
import { DrawShape, StopDraw } from "../../types";

interface DrawProps {
    drawing?: boolean;
    shapes: TShape[];
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

export type { DrawProps };
