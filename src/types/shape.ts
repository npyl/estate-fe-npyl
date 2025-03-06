/**
 * TShape is the type that represents a map shape (e.g. Circle, Rectangle, Polygon) in the Backend
 * [x, y]
 * IMPORTANT: Backend requires null for y on a circle
 */
type TPoint = { x: number; y: number | null };
type TShape = TPoint[];

export type { TPoint, TShape };
