import { TShape } from "@/types/shape";
import { DrawShape } from "../../types";

interface DrawProps {
    shapes?: TShape[];
    onDraw?: (shape: DrawShape) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
    onClear?: VoidFunction;
}

export type { DrawProps };
