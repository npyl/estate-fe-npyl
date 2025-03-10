import { TShape } from "@/types/shape";
import { DrawShape, StopDraw } from "../../types";

type TDrawMode = "SINGLE" | "MULTIPLE";

interface DrawProps {
    mode: TDrawMode;
    shapes?: TShape[];
    onDraw?: (shape: DrawShape | StopDraw) => void;
    onShapeChange?: (oldShape: TShape, newShape: TShape) => void;
}

export type { TDrawMode, DrawProps };
