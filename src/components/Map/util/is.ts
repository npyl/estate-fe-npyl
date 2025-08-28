import { TShape } from "@/types/shape";

const isCircle = (shape: TShape) => shape.length === 2 && shape[1].y === null;

export { isCircle };
