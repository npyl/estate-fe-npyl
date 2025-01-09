import { CellPosition } from "../types";

// Helper to calculate overlap ratio between element and cell
function getOverlapRatio(elementRect: DOMRect, cell: CellPosition) {
    const x1 = Math.max(elementRect.left, cell.left);
    const y1 = Math.max(elementRect.top, cell.top);
    const x2 = Math.min(elementRect.right, cell.left + cell.width);
    const y2 = Math.min(elementRect.bottom, cell.top + cell.height);

    if (x2 <= x1 || y2 <= y1) return 0;

    const overlapArea = (x2 - x1) * (y2 - y1);
    const elementArea = elementRect.width * elementRect.height;

    return overlapArea / elementArea;
}

export default getOverlapRatio;
